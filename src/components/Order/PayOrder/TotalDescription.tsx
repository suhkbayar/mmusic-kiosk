import React from 'react';
import { useTranslation } from 'react-i18next';
import { numberFormat } from '../../../utils';
import { isEmpty } from 'lodash';
import { useCallStore } from '../../../contexts/call.store';
import moment from 'moment';

type Props = {
  order: any;
};

const Index = ({ order }: Props) => {
  const { t } = useTranslation('language');
  const { participant } = useCallStore();

  const withVat = order?.vatState === 'G';

  const orderTaxSum = order && Math.abs(order?.taxAmount + order?.vatAmount + order?.cityTax).toFixed(2);

  return (
    <div className=" text-[16px]  cart-totals   shadow-md  h-full  border border-gray-200  text-black  ">
      <div className="p-4 pt-2">
        <div className="text-center ">
          <span className="text-sm  font-semibold">{participant.branch.name}</span>
        </div>
        <div className="border-b  my-1"></div>
        <div className=" flex w-full text-center justify-center  mb-2">
          <span className="font-bold text-lg">{t(`mainPage.${order.type}`)}</span>
        </div>
        <div className="mt-2">
          <span>Огноо: {moment(order?.date).format('yyyy-MM-DD HH:mm')}</span>
        </div>

        {withVat && (
          <div className="mt-2">
            <span>ДДТД: {order?.vatBillId}</span>
          </div>
        )}
        {withVat && order?.vatType === 3 && (
          <>
            <div className="mt-2">
              <span>ТТД: {order?.register}</span>
            </div>
            <div className="mt-2">
              <span>Нэр: {order?.buyer}</span>
            </div>
          </>
        )}

        <div className="border-b  my-1"></div>

        <div className="w-full">
          <table className="table-auto w-full">
            <thead className="border-b  my-1">
              <tr>
                <th className="text-start">Бараа</th>
                <th align="center">Тоо</th>
                <th align="right">Үнэ</th>
                <th align="right">Дүн</th>
              </tr>
            </thead>
            <tbody className="border-b  my-1">
              {order?.items
                .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                .map((item: any, index: any) => (
                  <tr key={index}>
                    <td width={'40%'}>{item.name}</td>
                    <td width={'20%'} align="center">
                      {item.quantity}
                    </td>
                    <td width={'12%'} align="right">
                      {numberFormat.format(item.price)}
                    </td>
                    <td width={'25%'} align="right">
                      {numberFormat.format(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td align="center">
                  {order?.items
                    .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                    .reduce((sum: any, a: any) => sum + a.quantity, 0)}
                </td>
                <td />

                <td align="right">
                  {numberFormat.format(
                    order?.items
                      .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                      .reduce((sum: any, a: any) => sum + a.quantity * a.price, 0),
                  )}
                </td>
              </tr>
            </tfoot>
          </table>

          <table width={'100%'} className="mt-2">
            <tr>
              <td width={'100%'} align="left">
                <strong>Хөнгөлөлт </strong>
              </td>
              <td width={'100%'} />
              <td width={'100%'} align="right">
                <strong>
                  {order?.discountAmount !== 0 && '-'}
                  {numberFormat.format(order?.discountAmount)}
                </strong>
              </td>
            </tr>

            {!isEmpty(order?.discounts) && (
              <>
                {order?.discounts
                  ?.filter((d) => d.state == 'A')
                  ?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td width={'100%'} align="left">
                        <span style={{ marginLeft: '10px' }}>{item.name}</span>
                      </td>
                      <td width={'100%'} />
                      <td width={'100%'} align="right">
                        {item.amount !== 0 && '-'}
                        {numberFormat.format(item.amount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}

            <tr>
              <td width={'100%'} align="left">
                <strong>Татвар,хураамж: </strong>
              </td>
              <td width={'100%'} />
              <td width={'100%'} align="right">
                <strong>{orderTaxSum}</strong>
              </td>
            </tr>

            {!isEmpty(order?.charges) && (
              <>
                {order?.charges
                  ?.filter((c) => c.state == 'A')
                  ?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td width={'100%'} align="left">
                        <span style={{ marginLeft: '10px' }}> {item.name}:</span>
                      </td>
                      <td width={'100%'} />

                      <td width={'100%'} align="right">
                        {numberFormat.format(item.amount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}

            {withVat && (
              <tr>
                <td width={'100%'} align="left">
                  <span style={{ marginLeft: '10px' }}>НӨАТ : </span>
                </td>
                <td width={'100%'} />

                <td width={'100%'} align="right">
                  {numberFormat.format(order?.vatAmount)}
                </td>
              </tr>
            )}
            {withVat && order?.cityTax !== 0 && (
              <tr>
                <td width={'100%'} align="left">
                  <span style={{ marginLeft: '10px' }}>НХАТ : </span>
                </td>
                <td width={'100%'} />

                <td width={'100%'} align="right">
                  {numberFormat.format(order?.cityTax)}
                </td>
              </tr>
            )}
            <tr>
              <td width={'100%'} align="left">
                <strong>Төлөх дүн : </strong>
              </td>
              <td width={'100%'} />
              <td width={'100%'} align="right">
                <strong>{numberFormat.format(order?.grandTotal)}</strong>
              </td>
            </tr>
          </table>

          <div className="border-t  my-1" />
          <div className="mt-2 w-full flex items-center  flex-col ">
            <strong>Та дахин ирж үйлчлүүлээрэй </strong>
            <h2>Баярлалаа</h2>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Index;
