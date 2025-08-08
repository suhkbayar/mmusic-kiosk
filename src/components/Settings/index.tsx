import React, { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ToggleButton from '../Button/ToggleButton';
import { IoExitOutline } from 'react-icons/io5';
import { CiCircleCheck } from 'react-icons/ci';
import { AiOutlineFileSearch, AiOutlineLoading } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { decode } from 'js-base64';
import { TotalReceipt } from './totalReceipt';
import { useReactToPrint } from 'react-to-print';
import { Spinner } from 'flowbite-react';

interface Props {
  data: any;
  setShow: (value: boolean) => void;
}
function Settings(props: Props) {
  const { setShow, data } = props;
  const [checking, setChecking] = useState(false);
  const [settlementing, setSettlementing] = useState(false);
  const [dataString, setDataString] = useState<string>();
  const [message, setMessage] = useState<any>({ action: '', message: '' });
  const printRef = useRef();

  const labels = [
    { label: 'Нэр', value: data?.name },
    { label: 'Терминал ID', value: data?.merchantCode },
    { label: 'COM PORT', value: data?.invoiceCode },
  ];

  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const checkConnection = async (channel) => {
    setChecking(true);

    const requestJson = {
      requestID: '7901',
      portNo: channel.invoiceCode,
      timeout: '540000',
      terminalID: channel.merchantCode,
      amount: '',
      currencyCode: '496',
      operationCode: '26',
      bandWidth: '115200',
      cMode: '',
      cMode2: '',
      additionalData: '',
      cardEntryMode: '',
      fileData: '',
    };

    const base64String = Buffer.from(JSON.stringify(requestJson)).toString('base64');

    const url = `http://localhost:8500/requestToPos/message?data=${base64String}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setMessage({ action: 'Холболт шалгах', message: 'Амжилтгүй' });
      }
      const result = await response.json();
      const { responseCode, responseDesc } = await JSON.parse(result.PosResult);
      if (responseCode === '00') {
        setMessage({ action: 'Холболт шалгах', message: 'Амжилттай' });
      } else {
        setMessage({ action: 'Холболт шалгах', message: responseDesc });
      }
    } catch (error) {
      setMessage({ action: 'Холболт шалгах', message: 'Амжилтгүй' });
    } finally {
      setChecking(false);
    }
  };

  const getSettlement = async (channel) => {
    if (!channel) return setMessage({ action: 'Өдөр өндөрлөх', message: 'Амжилтгүй' });

    setSettlementing(true);
    const requestJson = {
      requestID: '7901',
      portNo: channel.invoiceCode,
      timeout: '540000',
      terminalID: channel.merchantCode,
      amount: '',
      currencyCode: '496',
      operationCode: '59',
      bandWidth: '115200',
      cMode: '',
      cMode2: '',
      additionalData: '',
      cardEntryMode: '',
      fileData: '',
    };

    const base64String = Buffer.from(JSON.stringify(requestJson)).toString('base64');

    const url = `http://localhost:8500/requestToPos/message?data=${base64String}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setMessage({ action: 'Өдөр өндөрлөх', message: 'Амжилтгүй' });
      }
      const result = await response.json();
      const { data, responseCode, responseDesc } = await JSON.parse(result.PosResult);
      if (responseCode === '00') {
        setMessage({ action: 'Өдөр өндөрлөх', message: 'Амжилттай' });

        console.log(data, ' settlement data');

        const decodeData = await JSON.parse(decode(data));
        console.log(decodeData, 'decodeData');

        if (decodeData.receiptData) {
          setDataString(decodeData.receiptData);
          onPrint();
        } else {
          setMessage({ action: 'Өдөр өндөрлөх', message: 'Өдөр өндөрлөгөө хийгдсэн' });
        }
      } else {
        setMessage({ action: 'Өдөр өндөрлөх', message: responseDesc });
      }
    } catch (error) {
      setMessage({ action: 'Өдөр өндөрлөх', message: 'Амжилтгүй' });
    }
    setSettlementing(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <header className="w-full flex items-center justify-between">
        <p className="text-black"></p>
        <MdClose className="text-black w-6 h-6" onClick={() => setShow(false)} />
      </header>
      <main className="w-full flex min-h-[40vh] h-full">
        <nav className="w-2/6 border rounded-md min-h-full text-black flex flex-col justify-between ">
          <div className="">
            <p className="text-base border-b p-2 bg-[#fcfcfc] rounded-t-md font-bold uppercase">Байгууллага</p>

            <ul className="flex  flex-col w-full ">
              <li className="flex cursor-pointer border-l-4  border-b py-2 pl-2 bg-border bg-[#fcfcfc]">
                <div>Ippos</div>
              </li>
              <li className="flex cursor-pointer w-full py-2 justify-between pl-2 pr-3 bg-white border-b">
                <p>Theme</p>
                <ToggleButton />
              </li>
            </ul>
          </div>
          <div className="flex cursor-pointer border-t px-4 py-1.5 bg-border ">
            <div className="flex w-full items-center gap-4" onClick={() => setShow(false)}>
              <IoExitOutline className="w-5 h-5" />
              <p className="">Гарах</p>
            </div>
          </div>
        </nav>
        <section className="flex flex-col w-5/6 px-2">
          <div className="w-full border-b  ">
            <p className="text-base p-2 bg-[#fcfcfc] rounded-t-md font-bold  text-black">Голомт пос</p>
          </div>
          <table className="min-w-full text-black ">
            <p className="pb-2 pl-2 pt-3 font-bold  text-black">Үндсэн мэдээлэл</p>
            <tbody>
              {labels.map((item, index) => (
                <tr key={index} className=" border-t">
                  <td className="py-2 px-4 border-b border-l  ">{item.label}</td>
                  <td className="py-2 px-4 border-b border-x hover:bg-gray-100 bg-white  ">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 w-full flex-col mt-6 text-white">
            <button
              className="bg-[#718fe2] w-2/4 rounded-sm py-1 flex items-center px-2 gap-1"
              onClick={() => getSettlement(data)}
              disabled={settlementing}
            >
              {settlementing ? <Spinner /> : <AiOutlineFileSearch className="w-5 h-5" />}
              <p>Өдөр өндөрлөх</p>
            </button>
            <button
              className="bg-[#718fe2] w-2/4 rounded-sm py-1 flex items-center px-2 gap-1"
              onClick={() => checkConnection(data)}
              disabled={checking}
            >
              {checking ? <Spinner /> : <CiCircleCheck className="w-5 h-5" />}
              <p className="">Холболт шалгах</p>
            </button>
            <a
              href={`https://master.qrms.mn/settings/payment/glp/${data?.id}`}
              target="_blank"
              className="bg-[#718fe2] w-2/4 rounded-sm py-1 flex items-center px-2 gap-1"
            >
              <FaEdit className="w-5 h-5" />
              <p className="">Мэдээлэл өөрчлөх</p>
            </a>
          </div>
          {message?.action !== '' && (
            <div className="w-full flex items-center  gap-1 mt-2">
              <p className="text-black font-bold">{message?.action}:</p>
              <p className="text-gray1">{message?.message}</p>
            </div>
          )}
        </section>
      </main>
      <TotalReceipt ref={printRef} data={dataString} />
    </div>
  );
}

export default Settings;
