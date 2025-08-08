import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PAYMENT } from '../graphql/query';
import { LOGIN_BY_ADMIN } from '../graphql/mutation/sign';
import { useCallStore } from '../contexts/call.store';
import { PAYMENT_TYPE } from '../constants/constant';

export default function useSettings() {
  const [settings, setSettings] = useState(false);
  const [getPayment, { data, loading }] = useLazyQuery(GET_PAYMENT);
  const [error, setError] = useState('');
  const { participant } = useCallStore();

  const handleSubmit = (values) => {
    loginByAdmin({
      variables: { email: values.email, password: values.password },
      onCompleted(data) {
        setError('');
        getPos(data?.loginByAdmin?.token);
      },
      onError(err) {
        let msg = err.message;
        setError(msg);
        try {
          const obj = JSON.parse(err.message);
          let availableAttempts = +obj.availableAttempts;
          msg = obj.message;
          if (availableAttempts > 1 && availableAttempts < 3) {
            setError(`Таны боломжит оролдлого ${availableAttempts} үлдлээ.`);
          }
          if (availableAttempts === 1) {
            setError(
              `Таны боломжит оролдлого 1 үлдлээ. Буруу хийсэн тохиолдолд "Нууц үг сэргээх" товч дээр дарж сэргээнэ үү.`,
            );
          } else {
            setError(msg);
          }
        } catch (error) {
          setError(msg);
        }
      },
    });
  };

  const [loginByAdmin, { loading: loggingByEmail }] = useMutation(LOGIN_BY_ADMIN);

  const getPos = (token: string) => {
    if (!token) {
      setSettings(false);
    } else {
      const id = participant.payments.find((e) => e.type === PAYMENT_TYPE.GLP)?.id;
      getPayment({
        variables: { id },
        fetchPolicy: 'network-only',
        onCompleted() {
          setSettings(true);
        },
      });
    }
  };

  return {
    setSettings,
    settings,
    handleSubmit,
    loading: loggingByEmail || loading,
    error,
    data: data?.getPayment,
  };
}
