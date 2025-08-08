import React from 'react';
import { ConvertQpayBankImg } from '../../../tools/convertImg'; // Import your image conversion function

type Props = {
  id: string;
  watch: any;
  onSelect: (type: string, id: string) => void;
};

const Index: React.FC<Props> = ({ id, watch, onSelect }) => {
  if (!id) return null;
  return (
    <button
      type="submit"
      onClick={() => onSelect('Khan bank', id)}
      className=" inline-grid rounded-xl  place-self-center relative justify-items-center bg-macDonald w-56 p-12  shadow-lg  mt-4 "
    >
      <div className="w-24">
        <div className="text-center">
          <img className={`w-24 rounded-lg mb-2`} src={ConvertQpayBankImg('QPay')} alt="Bank" />
          <span className="text-xl text-white  font-semibold">{'QPay'}</span>
        </div>
      </div>
    </button>
  );
};

export default Index;
