import { forwardRef } from 'react';
import moment from 'moment';
import { numberFormat } from '../../utils';
import { useTranslation } from 'react-i18next';

type KitchenReceiptProps = {
  order: any;
};

const KitchenReceipt = forwardRef<HTMLDivElement, KitchenReceiptProps>((props, ref) => {
  const { order } = props;
  const { t } = useTranslation('language');

  const filteredItems = order?.items?.filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN');

  const totalQuantity = filteredItems?.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const totalAmount = filteredItems?.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);

  return (
    <div ref={ref} className="w-[80mm] p-2 text-[11px] bg-white text-black font-sans">
      <div className="text-center mt-2 mb-1">
        <h2 className="text-sm font-semibold">Гал тогоонд өгөх баримт</h2>
      </div>

      <div className="flex justify-between items-center border-y py-1 text-[12px] font-semibold">
        <span>Дугаар: {order?.number?.slice(8)}</span>
        <span>{t(`mainPage.${order?.type}`)}</span>
      </div>

      <div className="text-[11px] my-2 space-y-1">
        <p> Огноо: {moment(order?.date).format('YYYY-MM-DD HH:mm')}</p>
        <p> Захиалгын дугаар: {order?.number}</p>
      </div>

      <table className="w-full text-left border-t border-b">
        <thead>
          <tr className="border-b text-[10px] font-semibold">
            <th className="py-1 pl-1 w-[40%]">Бараа</th>
            <th className="text-center w-[15%]">Тоо</th>
            <th className="text-right w-[20%]">Үнэ</th>
            <th className="text-right w-[25%]">Дүн</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems?.map((item: any, index: number) => (
            <tr key={index} className="border-b last:border-none">
              <td className="py-1 pl-1">{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-right pr-1">{numberFormat.format(item.price)}</td>
              <td className="text-right pr-1">{numberFormat.format(item.quantity * item.price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold border-t">
            <td className="py-1 pl-1">Нийт</td>
            <td className="text-center">{totalQuantity}</td>
            <td />
            <td className="text-right pr-1">{numberFormat.format(totalAmount)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6" />
    </div>
  );
});

export default KitchenReceipt;
