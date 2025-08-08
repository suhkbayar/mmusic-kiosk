import React, { useState } from 'react';
import { BiSearchAlt2, BiInfoCircle } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import ToggleLanguage from '../../components/Button/ToggleLanguage';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { AboutUsSidebar } from '../../components';
import ToggleButton from '../../components/Button/ToggleButton';
import useSettings from '../../hooks/useSettings';
import LoginDrawer from '../../components/LoginDrawer/LoginDrawer';

type Props = {
  isBacked?: boolean;
};

const Index = ({ isBacked }: Props) => {
  const router = useRouter();
  const { participant } = useCallStore();
  const [settings, setSettings] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { t } = useTranslation('language');

  const goBack = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  const onRefresh = () => {
    router.push(`/kiosk?id=${participant.id}`);
  };

  const goSearchProducts = () => {
    router.push(`search-products`);
  };

  return (
    <>
      <div className="absolute top-0 w-full z-10 bg-transparent py-2 md:py-4 dark:bg-transparent  ">
        <div className=" px-4 w-full md:flex md:items-center">
          <div className="flex justify-between items-center">
            <p>{isBacked && <BiArrowBack className="text-white text-xl" onClick={() => goBack()} />}</p>
            <div className="flex gap-3 text-xl md:hidden text-white">
              <BiSearchAlt2 onClick={() => goSearchProducts()} />
              <BiInfoCircle onClick={() => setSidebarVisible(true)} />
              <ToggleLanguage />
              <IoSettingsSharp
                onClick={() => setSettings(!settings)}
                className="color-current text-gray1 dark:text-white w-6 h-6  "
              />
            </div>
          </div>

          <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
            <div className="ml-4 flex gap-3  ">
              <ToggleLanguage />
              <div className="p-2 rounded-full border border-gray-100 bg-gray-100">
                <IoSettingsSharp
                  onClick={() => setSettings(!settings)}
                  className="color-current text-gray1 dark:text-white w-6 h-6   "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {settings && <LoginDrawer setShow={setSettings} show={settings} />}
      {sidebarVisible && <AboutUsSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />}
    </>
  );
};

export default Index;
