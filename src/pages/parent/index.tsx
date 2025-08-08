import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_BRANCHES } from '../../graphql/query';

import { useContext, useEffect } from 'react';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import { useMutation } from '@apollo/client';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { emptyOrder } from '../../mock';
import { AuthContext, getPayload } from '../../providers/auth';
import { useCallStore } from '../../contexts/call.store';
import AnimatedBackground from '../../layouts/Content/AnimateBackground';
import { ModalHeader } from '../../components';
import logo from '../../assets/images/newQ.png';
import Loader from '../../components/Loader/Loader';
const KioskPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const [play] = useSound(SOUND_LINK, { volume: 1 });

  const [getParticipants, { data: participantsData, loading }] = useLazyQuery(GET_BRANCHES, {
    onCompleted: (data) => {
      localStorage.setItem('branches', JSON.stringify(data.getParticipants));
    },
    onError: () => {
      router.push('/notfound');
    },
  });
  const { load } = useCallStore();
  const { authenticate } = useContext(AuthContext);
  const [getCurrentToken, { loading: authLoading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      load(emptyOrder);
      localStorage.setItem('parentId', id as string);
      authenticate(data.getToken.token, () => getParticipants());
      getPayload();
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleBranchSelect = (channelId: string) => {
    play();
    router.push(`kiosk?id=${channelId}`);
  };

  useEffect(() => {
    if (id) {
      getCurrentToken({ variables: { code: id, type: 'K' } });
    }
  }, [id, getCurrentToken]);

  if (loading || authLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen bg-[rgba(254,202,66,0.3)]">
      <div className="absolute top-0 w-full p-8">
        <ModalHeader />
      </div>

      <div className="h-full items-center place-content-center flex flex-wrap gap-10 px-8">
        {participantsData?.getParticipants.map((p: any) => (
          <div
            key={p.id}
            onClick={() => handleBranchSelect(p.id)}
            className="grid place-items-center p-16 shadow-lg bg-macDonald rounded-3xl hover:shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="w-24 h-24 object-cover max-w-xl relative">
              <img src={p.branch.logo || '/images/default-branch.jpg'} alt={p.branch.name} className="rounded-xl" />
            </div>
            <div className="text-3xl mt-6 text-white font-semibold text-center w-[300px] h-[80px] flex items-center justify-center">
              {p.branch.name
                .split(' ')
                .map((word, index, array) => (index === Math.floor(array.length / 2) - 1 ? word + '\n' : word + ' '))
                .join('')}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 z-40 w-full flex justify-center pb-8">
        <img src={logo.src} className="w-32" alt="Logo" />
      </div>

      <AnimatedBackground isWhite={false} />
    </div>
  );
};

export default KioskPage;
