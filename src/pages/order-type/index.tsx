import { useCallStore } from '../../contexts/call.store';
import ModalHeader from '../../layouts/Header/modalHeader';
import router from 'next/router';
import AnimatedBackground from '../../layouts/Content/AnimateBackground';
import { SOUND_LINK, TYPE } from '../../constants/constant';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { DineIn, TakeAway } from '../../assets/icons/service';
import logo from '../../assets/images/newQ.png';
import menu from '../../assets/icons/menu.png';
import karaoke from '../../assets/icons/karaoke.png';

const OrderType = () => {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation('language');
  const { participant, order, load } = useCallStore();
  const [parentId, setParentId] = useState('');
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

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
    router.push(`/restaurant?id=${participant.id}`);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  return (
    <div className="h-screen bg-[rgba(254,202,66,0.3)]">
      <div className="absolute top-0 w-full p-8">{participant && <ModalHeader />}</div>
      <div className="absolute bottom-0 z-40 w-full items-center justify-center">
        <img src={logo.src} className="justify-self-center w-32" alt="Logo" />
      </div>
      <div className=" flex flex-col items-center justify-center h-full  ">
        <div className=" items-center place-content-center flex gap-10">
          <div
            onClick={() => handleOrderType(TYPE.DINIG)}
            className="grid  place-items-center p-16 shadow-lg bg-macDonald rounded-3xl hover:shadow-lg cursor-pointer  "
          >
            <div className="w-24 h-24 object-cover  max-w-xl">
              <img src={menu.src} className="justify-self-center " alt="Logo" />
            </div>
            <div className="text-3xl mt-6 text-white text-semibold ">Захиалга</div>
          </div>
          <div
            onClick={() => handleOrderType(TYPE.TAKE_AWAY)}
            className=" p-16  place-items-center bg-macDonald shadow-lg rounded-3xl hover:shadow-lg cursor-pointer"
          >
            <div className="w-24 h-24 object-cover  max-w-xl">
              <img src={karaoke.src} className="justify-self-center " alt="Logo" />
            </div>
            <div className="text-3xl  mt-6 text-white">Караоке</div>
          </div>
        </div>
        {parentId && parentId.length > 0 ? (
          <button
            onClick={() => router.push(`/parent?id=${parentId}`)}
            className=" flex items-center justify-center
         border text-3xl pl-20 pr-20 bg-[#ebbf5f] rounded-xl p-4 mt-[80px] text-white"
          >
            Буцах
          </button>
        ) : null}
      </div>

      <AnimatedBackground isWhite={false} />
    </div>
  );
};

export default OrderType;
