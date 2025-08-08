import React from 'react';
import { useCallStore } from '../../contexts/call.store';
import { TfiClose } from 'react-icons/tfi';
import { useTranslation } from 'react-i18next';
import { FeedbackForm } from '..';
import { CREATE_FEEDBACK } from '../../graphql/mutation/feedBack';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useNotificationStore from '../../contexts/notificationStore';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCloseSideBars: () => void;
};

const Index = ({ setVisible, visible, onCloseSideBars }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { participant } = useCallStore();
  const { showNotification } = useNotificationStore();
  const { t } = useTranslation('language');

  const [createFeedback] = useMutation(CREATE_FEEDBACK, {
    onCompleted: (data) => {
      showNotification('success', t('mainPage.ConfirmFeedBack'));
      onCloseSideBars();
    },
    onError(err) {
      showNotification('warning', err.message);
    },
  });

  const handleClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    createFeedback({ variables: { id: id, input: values } });
  };

  return (
    <div
      className={`fixed  rounded-s-lg bg-white top-0 right-0 h-screen w-10/12  sm:w-2/4 xl:w-1/4 2xl:w-1/4  pt-4 ${
        visible ? 'animate-slide-in' : 'animate-slide-out'
      }`}
      style={{ zIndex: 100 }}
    >
      <TfiClose onClick={handleClose} className="absolute top-2 right-2 w-5 h-5" />
      <div className="flex place-content-center">
        <img src={participant.branch.logo} className="w-44 rounded-lg" />
      </div>
      <div>
        <div className="flex place-content-center mt-2">
          <p className="font-semibold text-misty">{t('mainPage.SendFeedback')}</p>
        </div>
      </div>
      <FeedbackForm onSubmit={onFinish} />
    </div>
  );
};

export default Index;
