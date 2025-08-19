import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import 'animate.css';
import Head from 'next/head';
import client from '../providers/client';
import i18next from 'i18next';
import { LANG_RESOURCES } from '../constants/constantLang';
import { AuthProvider, getPayload } from '../providers/auth';
import { isEmpty } from 'lodash';
// import { ThemeProvider } from 'next-themes';
import { Notification } from '../helpers/notification';
import React, { useEffect, useState } from 'react';
import { AlertModal } from '../helpers/alert';
import SubscriptionProvider from '../providers/SubscriptionProvider';
import { useRouter } from 'next/router';
import 'react-simple-keyboard/build/css/index.css';
import { ErrorBoundary } from '../components/Error/ErrorBoundary';
import { useCallStore } from '../contexts/call.store';
import { emptyOrder } from '../mock';

const payload = getPayload();

const initialLanguage = () => {
  return isEmpty(payload?.languages) || payload?.languages[0] === '' || !payload?.languages[0]
    ? 'mn'
    : payload?.languages[0];
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: initialLanguage(),
  resources: LANG_RESOURCES,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [animate, setAnimate] = useState('animate__fadeIn');
  const { participant, load } = useCallStore();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setAnimate('animate__fadeOut');
    };

    const handleRouteChangeComplete = () => {
      setAnimate('animate__fadeIn');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const newOrder = () => {
    if (participant) {
      let paramUrl = localStorage.getItem('paramUrl');

      if (isEmpty(paramUrl)) {
        router.push(`/kiosk?id=${participant.id}`);
      } else {
        router.push(`/kiosk?${paramUrl}`);
      }
      load(emptyOrder); // Ensure `load` exists
    } else {
      const qr = localStorage.getItem('qr');

      router.push(`/kiosk?id=${qr}`);
    }
  };

  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', message, error);
      newOrder();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Q-Menu</title>
      </Head>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
          <AuthProvider>
            <Notification />
            <AlertModal />
            <SubscriptionProvider>
              <ErrorBoundary onError={newOrder}>
                <div className={`animate__animated ${animate}`}>
                  <Component {...pageProps} />
                </div>
              </ErrorBoundary>
            </SubscriptionProvider>
          </AuthProvider>
        </I18nextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
