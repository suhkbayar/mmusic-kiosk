import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { isValidToken } from '../../providers/auth';
import { useCallStore } from '../../contexts/call.store';
import { GET_BRANCH } from '../../graphql/query/branch';
import Loader from '../../components/Loader/Loader';
import { Translator } from 'react-auto-translate';
import { cacheProvider } from '../../contexts/translate.context';
import { Languages } from '../../constants/constantLang';
import { useTranslation } from 'react-i18next';
import { GOOGLE_CLOUD_KEY } from '../../constants/constanApi';
import { isEmpty } from 'lodash';
import { emptyOrder } from '../../mock';
import { TYPE } from '../../constants/constant';
import { MainContents, OrderProcessingScreensaver } from '../../components';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const isValid = isValidToken();
  const { setParticipant, participant, order, load } = useCallStore();
  const { i18n } = useTranslation('language');
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const [exp, setExp] = useState<any>([]);

  const [getBranch, { data }] = useLazyQuery(GET_BRANCH, {
    pollInterval: 180000,
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setParticipant(data.getParticipant);
      if (data.getParticipant.orderable && isEmpty(order)) {
        load(emptyOrder);
      }

      const services = participant.services.length >= 2;
      if (isEmpty(order.type)) {
        if (services) {
          return router.push('/order-type');
        } else {
          if (participant.services.includes(TYPE.DINIG)) {
            load({ ...order, type: TYPE.DINIG });
          } else {
            load({ ...order, type: TYPE.TAKE_AWAY });
          }
        }
      }

      setLoading(false);
    },
    onError(error) {
      // if (isValid) {
      //   router.push('/notfound');
      // }
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBranch({ variables: { id: id } });
    }
  }, [id]);

  useEffect(() => {
    let ee = [];
    for (let i = 0; i < 197; i++) {
      ee.push(i);
    }
    setExp(ee);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  if (loading || !participant) return <Loader />;

  return (
    <Translator
      cacheProvider={cacheProvider}
      from="mn"
      to={Languages.find((item) => i18n.language.includes(item.name.toLowerCase())).name.toLowerCase()}
      googleApiKey={GOOGLE_CLOUD_KEY}
    >
      {participant && <MainContents />}
    </Translator>
  );
};

export default Index;
