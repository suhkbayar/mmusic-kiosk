import { useTranslation } from 'react-i18next';
import { TotalDescription } from '..';
import { IOrder } from '../../types';

type Props = {
  order: IOrder;
};

const OrderInfo = ({ order }: Props) => {
  const { t } = useTranslation('language');

  return (
    <div className="flex  w-full   items-center place-content-center	">
      <div className="w-[22rem] ">
        <TotalDescription order={order} />
      </div>
    </div>
  );
};

export default OrderInfo;
