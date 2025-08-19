import { useCallStore } from '../../contexts/call.store';
import ModalHeader from '../../layouts/Header/modalHeader';
import router from 'next/router';
import AnimatedBackground from '../../layouts/Content/AnimateBackground';
import { SOUND_LINK, TYPE } from '../../constants/constant';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import logo from '../../assets/icons/qmenu_white.png';
import menu from '../../assets/icons/menu_icon.jpg';
import mmusic from '../../assets/icons/mmusic1.png';
import MKaraokeModal from '../../components/Modal/MkaraokeModal';

const OrderType = () => {
  const [visible, setVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation('language');
  const { participant, order, load } = useCallStore();
  const [parentId, setParentId] = useState('');
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const close = useCallback(() => setVisible(false), []);
  const open = useCallback(() => setVisible(true), []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedParentId = localStorage.getItem('parentId');
      setParentId(storedParentId);
    }
  }, []);
  const handleOrderType = (type) => {
    play();
    load({
      ...order,
      type,
    });

    if (type === 'karaoke') {
      router.push(
        `https://remote.mkaraoke.mn/?univision_id=81664846&mac_address=AC:1A:3D:BB:7D:2C&serial_number=GZ24050222501180`,
      );
      return;
    } else {
      router.push(`/restaurant?id=${participant.id}`);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  return (
    <div className="h-screen bg-[#658DF5]">
      <div className="absolute top-0 w-full p-8">{participant && <ModalHeader />}</div>
      <div className="absolute bottom-0 z-10 w-full items-center justify-center">
        <img src={logo.src} className="justify-self-center w-32" alt="Logo" />
      </div>
      <div className=" flex flex-col items-center justify-center h-full  ">
        <div className=" items-center place-content-center flex gap-10">
          <div
            onClick={open}
            className=" p-16  place-items-center bg-[#1B66FF] shadow-lg rounded-3xl hover:shadow-lg cursor-pointer"
          >
            <div className="w-24 h-24 object-cover  max-w-xl">
              <img src={mmusic.src} className="justify-self-center " alt="Logo" />
            </div>
            <div className="text-3xl  mt-6 text-white">M Караоке</div>
          </div>
          <div
            onClick={() => handleOrderType(TYPE.DINIG)}
            className="grid  place-items-center p-16 shadow-lg bg-[#1B66FF] rounded-3xl hover:shadow-lg cursor-pointer  "
          >
            <div className="w-24 h-24 object-cover  max-w-xl">
              <img src={menu.src} className="justify-self-center " alt="Logo" />
            </div>
            <div className="text-3xl mt-6 text-white text-semibold ">Захиалга</div>
          </div>
        </div>
      </div>

      <AnimatedBackground isWhite={false} />

      <MKaraokeModal visible={visible} onClose={close} />
    </div>
  );
};

export default OrderType;
