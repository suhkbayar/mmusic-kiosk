import { FieldValues, useForm } from 'react-hook-form';
import ModalHeader from '../../../layouts/Header/modalHeader';
import { VatForm } from '../../../components';
import VatFooter from '../../../components/Button/VatFooter';
import { useRouter } from 'next/router';
import { useCallStore } from '../../../contexts/call.store';
import logo from '../../../assets/icons/eBarimt_logo.png';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../../constants/constant';
import Loader from '../../../components/Loader/Loader';

const Vat = () => {
  const router = useRouter();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { participant, load, order } = useCallStore();
  const { id } = router.query as { id: string };
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'all',
    defaultValues: {
      vatType: '1',
    },
  });

  const { vatType, register: buyerRegister, buyer } = watch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  const onSubmit = (data: any) => {
    let targetVat = {};
    play();
    if (data.vatType === '1') {
      targetVat = {
        vatType: '1',
      };
    } else {
      targetVat = {
        vatType: '3',
        buyer: data.buyer,
        register: data.register,
      };
    }
    load({ ...order, ...targetVat });

    router.push(`/payment?id=${id}`);
  };

  return (
    <>
      {participant && <ModalHeader />}
      <div className="h-screen flex place-items-center">
        <div className="overflow-auto login-body w-full py-20 pt-0 justify-items-center">
          <img src={logo.src} alt="logo" className="w-56 mx-auto" />
          <form onSubmit={handleSubmit(onSubmit)} className=" mt-5 w-10/12	 ">
            <VatForm register={register} errors={errors} setValue={setValue} reset={reset} />
            <span className="text-xs pt-1 text-red-500 dark:text-white">{errors.register?.message}</span>
            <VatFooter id={id} vatType={vatType} buyer={buyer} buyerRegister={buyerRegister} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Vat;
