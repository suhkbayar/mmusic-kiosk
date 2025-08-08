import { forwardRef } from 'react';
import { useCallStore } from '../../contexts/call.store';
import moment from 'moment';
import { numberFormat } from '../../utils';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import Receipt from './Receipt';
import KitchenReceipt from './kitchenReceipt';

type OrderPrintProps = {
  order: any;
  qrUrl?: string;
};

const OrderPrint = forwardRef<HTMLDivElement, OrderPrintProps>((props, ref) => {
  const { participant } = useCallStore();
  const { t } = useTranslation('language');
  const { order, qrUrl } = props;

  const withVat = order?.vatState === 'G';
  const printCopyNoVat = participant.configs?.find((c) => c.name === 'PRINT_COPY_NO_VAT')?.value === 'true';
  const orderTaxSum = order && Math.abs(order?.taxAmount + order?.vatAmount + order?.cityTax).toFixed(2);

  return printCopyNoVat ? (
    <div ref={ref} className="w-[80mm] text-[10px] bg-white text-black">
      <div ref={ref} className="receipt-page break-after-page mb-[10mm]">
        <Receipt order={order} participant={participant} withVat={withVat} qrUrl={qrUrl} />
      </div>
      <div ref={ref} className="kitchen-page break-before-page mt-[10mm]">
        <KitchenReceipt order={order} />
      </div>
    </div>
  ) : (
    <div ref={ref} className="w-[80mm] text-[10px] p-[2mm] h-full bg-white text-black  ">
      <Receipt order={order} participant={participant} withVat={withVat} qrUrl={qrUrl} />
    </div>
  );
});

export default OrderPrint;
