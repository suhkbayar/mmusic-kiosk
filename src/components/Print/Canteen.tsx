import React, { forwardRef } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { dateFormat, moneyFormat } from '../../helpers/formatters';

type OrderViewProps = {
  order: any;
  withVat: boolean;
  qrUrl?: string;
  employeeBalance: number;
};

const RecieptCanteen = forwardRef<HTMLDivElement, OrderViewProps>((props, ref) => {
  const { participant } = useCallStore();
  const { order, employeeBalance } = props;
  return (
    <div ref={ref} className="w-[80mm] text-[10px] p-[2mm] h-full bg-white text-black hidden print:block">
      {participant?.branch && (
        <div>
          <h6 style={{ margin: '0' }}>{participant.branch.name}</h6>
          <span className={''}>Огноо : </span>
          <span>{dateFormat(order?.createdAt, 'yyyy-MM-DD HH:mm')}</span>
        </div>
      )}
      {order && (
        <>
          <table className={''}>
            <thead className={'styles.header'}>
              <tr>
                <th align="left">Бараа</th>
                <th align="center">Тоо</th>
                <th align="right">Үнэ</th>
                <th align="right">Дүн</th>
              </tr>
            </thead>
            <tbody>
              {order.items
                .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                .map((item: any) => (
                  <tr key={item.id}>
                    <td width={'40%'}>{item.name}</td>
                    <td width={'20%'} align="center">
                      {item.quantity}
                    </td>
                    <td width={'12%'} align="right">
                      {moneyFormat(item.price).replace('.00', '')}
                    </td>
                    <td width={'25%'} align="right">
                      {moneyFormat(item.quantity * item.price).replace('.00', '')}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className={''} width={'100%'}>
            <tbody>
              <tr>
                <td width={'20%'} align="left">
                  <strong>Захиалагын дүн : </strong>
                  <strong>{moneyFormat(order.grandTotal).replace('.00', '')}</strong>
                </td>
              </tr>
              <tr>
                <td width={'30%'} align="left">
                  <strong>Картын дүн : </strong>
                  <strong>{moneyFormat(employeeBalance).replace('.00', '')}</strong>
                </td>
              </tr>
              <tr>
                <td width={'50%'} align="left">
                  <strong>Эзэмшигч: </strong>

                  <strong>{order.name}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
});
export default RecieptCanteen;
