import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronRight } from 'react-icons/fi';
import { useCallStore } from '../../contexts/call.store';
import { TfiClose } from 'react-icons/tfi';

import info from '../../assets/images/info.svg';
import question from '../../assets/images/question.svg';
import note from '../../assets/images/note.svg';
import qr from '../../assets/images/qr.svg';
import { useRouter } from 'next/router';
import { SendFeedback } from '..';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const AboutUsSidebar = ({ visible, setVisible }: Props) => {
  const { participant } = useCallStore();
  const router = useRouter();
  const [visibleFeedBack, setVisibleFeedBack] = useState(false);
  const { t } = useTranslation('language');

  const handleClose = () => {
    setVisible(false);
  };

  const onCloseSidebars = () => {
    setVisibleFeedBack(false);
    setVisible(false);
  };

  const goAboutUs = () => {
    router.push('aboutUs');
  };

  const handleOpenAbout = () => {
    const url = 'https://about.qmenu.mn/';
    const newWindow = window.open(url, '_blank');
    newWindow.focus();
  };

  return (
    <>
      <div
        className={`fixed  rounded-s-lg bg-white top-0 right-0 h-screen w-10/12  sm:w-2/4 xl:w-1/4 2xl:w-1/4  pt-4 ${
          visible ? 'animate-slide-in' : 'animate-slide-out'
        }`}
        style={{ zIndex: 100 }}
      >
        <TfiClose onClick={handleClose} className="absolute top-2 right-2 w-5 h-5" />
        <div className="flex place-content-center">
          <img alt="logo" src={participant.branch.logo} className="w-44 rounded-lg" />
        </div>
        <div className="border-b my-2"></div>
        <div className="p-4 pt-0">
          <div
            onClick={() => goAboutUs()}
            className="flex cursor-pointer hover:bg-gainsboro  items-center rounded-lg  place-content-between p-2"
          >
            <div className="flex place-content-between ">
              <img alt="logo" src={info.src} className="h-6 w-6 text-gray-400  mr-2" />
              <span className="text-gray-700 ">{t('mainPage.RestaurantInformation')}</span>
            </div>
            <FiChevronRight className="text-gray-500 text-xl " />
          </div>
          <div className="border-b my-2"></div>
          <div
            onClick={() => setVisibleFeedBack(true)}
            className="flex cursor-pointer hover:bg-gainsboro  items-center rounded-lg  place-content-between p-2"
          >
            <div className="flex place-content-between">
              <img alt="logo" src={question.src} className="h-6 w-6 text-gray-400  mr-2" />
              <span className="text-gray-700 ">{t('mainPage.Feedback')}</span>
            </div>
            <FiChevronRight className="text-gray-500 text-xl " />
          </div>
          <div className="border-b my-2"></div>

          <div
            onClick={() => handleOpenAbout()}
            className="flex cursor-pointer hover:bg-gainsboro  items-center rounded-lg  place-content-between p-2"
          >
            <div className="flex place-content-between">
              <img alt="logo" src={qr.src} className="h-6 w-6 text-gray-400  mr-2" />
              <span className="text-gray-700 ">{t('mainPage.ConnectWithQmenu')}</span>
            </div>
            <FiChevronRight className="text-gray-500 text-xl " />
          </div>
          <div className="border-b my-2"></div>
          <div className="flex cursor-pointer hover:bg-gainsboro  items-center rounded-lg  place-content-between p-2">
            <div className="flex place-content-between">
              <img alt="logo" src={note.src} className="h-6 w-6 text-gray-400  mr-2" />
              <span className="text-gray-700 ">{t('mainPage.FillOutCustomerSurvey')}</span>
            </div>
            <FiChevronRight className="text-gray-500 text-xl " />
          </div>
        </div>
      </div>
      <>
        {visibleFeedBack && (
          <SendFeedback
            onCloseSideBars={() => onCloseSidebars()}
            visible={visibleFeedBack}
            setVisible={setVisibleFeedBack}
          />
        )}
      </>
    </>
  );
};

export default AboutUsSidebar;
