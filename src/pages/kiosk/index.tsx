import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import { useCallStore } from '../../contexts/call.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { emptyOrder } from '../../mock';
import { AuthContext, getPayload } from '../../providers/auth';

const Kiosk = () => {
  const router = useRouter();
  const { univision_id, mac_address, serial_number } = router.query;

  const { authenticate } = useContext(AuthContext);
  const { load } = useCallStore();

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      load(emptyOrder);
      authenticate(data.getToken.token, () => router.push(`/restaurant?id=${data.getToken.id}`));
      getPayload();
      let url = `univision_id=${univision_id}&mac_address=${mac_address}&serial_number=${serial_number}`;
      localStorage.setItem('paramUrl', url);
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  React.useEffect(() => {
    if (univision_id && mac_address && serial_number) {
      const code = `${univision_id}|${mac_address}|${serial_number}`;
      getCurrentToken({ variables: { code, type: 'MM' } });
    }
  }, [univision_id, mac_address, serial_number]);

  if (loading) return <Loader />;

  return <Loader />;
};

export default Kiosk;
