import React, { forwardRef } from 'react';

type TotalReceiptProps = {
  data: any;
};

export const TotalReceipt = forwardRef<HTMLDivElement, TotalReceiptProps>((props, ref) => {
  const dataString = props.data;

  if (!dataString) return;

  const regex = /(TOTALAMOUNT|TOTALTRANSACTION|BATCHNO|ТЕРМИНАЛ|0ОГНОО\/ЦАГ|ГјЙЛГЭЭSUM|ДјН):(.*?)(?=@|$)/g;
  const extractedValues: { [key: string]: string } = {};

  let match;
  while ((match = regex.exec(dataString)) !== null) {
    const key = match[1];
    const value = match[2];
    extractedValues[key] = value;
  }

  const convertString = (value: string) => {
    switch (value) {
      case 'TOTALAMOUNT':
        return ' Нийт дүн ';
      case 'TOTALTRANSACTION':
        return ' Нийт гүйлгээ ';
      case 'BATCHNO':
        return 'Багц дугаар';
      case 'ТЕРМИНАЛ':
        return ' Терминал';
      case '0ОГНОО/ЦАГ':
        return 'Огноо/Цаг';
      case 'ГјЙЛГЭЭSUM':
        return 'Гүйлгээ нийлбэр';
      case 'ДјН':
        return 'Нийт';
      default:
        break;
    }
  };

  return (
    <div ref={ref} className="p-2 w-[80mm] bg-white text-black text-[10px] hidden print:block">
      <table className="w-full">
        <tbody>
          {Object.entries(extractedValues).map(([key, value]) => (
            <tr key={key} className="text-left">
              <td className="w-2/3">{convertString(key)}:</td>
              <td className="font-bold">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
