import React from 'react';
import { ConvertBankImg } from '../../../tools/convertImg';
import { isEmpty } from 'lodash';

type Bank = {
  type: string;
  id: string;
  name: string;
};

type Props = {
  watch: any;
  onSelect: (type: string, id: string) => void;
  banks: Bank[];
};

const Index: React.FC<Props> = ({ watch, onSelect, banks }) => {
  if (isEmpty(banks)) return null;

  return (
    <>
      {banks.map((bank, index) => (
        <button
          key={index}
          type="submit"
          onClick={() => onSelect(bank.type, bank.id)}
          className=" inline-grid rounded-xl  place-self-center relative justify-items-center bg-macDonald w-56 p-12  shadow-lg  mt-4 "
        >
          <div className="w-28 h-32">
            <div className="text-center justify-items-center">
              <img className={`w-20  rounded-lg mb-2`} src={ConvertBankImg(bank.type)} alt={`${bank.type} Bank`} />
              <span className="text-xl text-white  font-semibold">{bank.name}</span>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default Index;
