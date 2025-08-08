import AnimatedBackground from '../../../layouts/Content/AnimateBackground';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../../../graphql/query';
import useNotificationStore from '../../../contexts/notificationStore';
import { useCallStore } from '../../../contexts/call.store';
import ModalHeader from '../../../layouts/Header/modalHeader';
import { FaRegCheckCircle } from 'react-icons/fa';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../../constants/constant';
import { emptyOrder } from '../../../mock';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { OrderProcessingScreensaver } from '../../../components';

const Index = () => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { participant, load } = useCallStore();
  const { id } = router.query as { id: string };
  const { showNotification } = useNotificationStore();
  const [isMounted, setIsMounted] = useState(false);

  const { loading, data } = useQuery(GET_ORDER, {
    skip: !id,
    variables: { id: id },
    onError(err) {
      showNotification('warning', err.message);
    },
  });

  const newOrder = () => {
    play();
    router.push(`/kiosk?id=${participant.id}`);
    load(emptyOrder);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loader />;

  if (!id) {
    return <Loader />; // Or redirect / show error
  }

  return (
    <div className={`h-screen bg-[rgba(254,202,66,0.3)] ${loading ? 'opacity-20' : ''} `}>
      <div className="absolute top-0 w-full p-8">{participant && <ModalHeader />}</div>
      <div className="h-full items-center place-content-center grid gap-10 pb-[20rem]">
        <div className="grid items-center place-content-center justify-items-center">
          <FaRegCheckCircle className="text-success text-[15rem]" />
          <span className="font-semibold text-3xl mb-4 text-gray-600 mt-8 ">{t('mainPage.order_successful')}</span>
        </div>
        <div className="grid  place-items-center p-20 shadow-lg bg-white rounded-3xl    ">
          <span className="font-semibold text-3xl mb-4 text-gray-600 ">{t('mainPage.YourOrderNumber')}</span>
          <div className="text-4xl font-semibold  text-macDonald  ">#{data?.getOrder?.number?.slice(-4)}</div>
        </div>
        <div className=" w-full bottom-10 justify-self-center">
          <div className=" flex justify-center	">
            <OrderProcessingScreensaver isSolid onClick={newOrder} startInterVal={30000} />
          </div>
        </div>
      </div>

      {loading && (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-[44%] left-1/2">
          <svg
            aria-hidden="true"
            className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-macDonald"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      <AnimatedBackground isWhite={false} />
    </div>
  );
};
export default Index;
