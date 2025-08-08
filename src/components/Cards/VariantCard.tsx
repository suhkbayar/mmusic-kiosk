import React from 'react';
import { IMenuVariant } from '../../types/menu';
import { Translate } from 'react-auto-translate';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { IOrderItem } from '../../types';
import check from '../../assets/order/Check.png';
import unCheck from '../../assets/order/UnCheck.png';
import { CURRENCY } from '../../constants/currency';
import Image from 'next/image';

type Props = {
  variant: IMenuVariant;
  selectedItem: IOrderItem;
  onSelect: (variant: IMenuVariant) => void;
  onRemove: (variant: IMenuVariant) => void;
};

const Index = ({ variant, selectedItem, onSelect, onRemove }: Props) => {
  if (!selectedItem) return;

  return (
    <>
      <div
        onClick={() => selectedItem.id !== variant.id && onSelect(variant)}
        className={`flex-shrink-0 grid content-between w-56 h-24 bg-white rounded-lg hover:shadow-md border hover:border-current m-2 p-2 pb-0  ${
          selectedItem?.id === variant.id ? 'border-current' : ''
        }`}
      >
        <div className="flex justify-between">
          <h2 className="line-clamp-2  font-normal text-misty text-sm ">
            <Translate>{variant.name} </Translate>
          </h2>
          <div className="relative flex justify-center items-center h-[19px] w-[20px] ">
            <Image
              alt=""
              placeholder="empty"
              priority={true}
              src={selectedItem.id === variant.id ? check.src : unCheck.src}
              className="animate-quantity-change w-full h-auto"
              fill
              sizes="19px 20px"
            />
          </div>
        </div>

        <div className="flex items-center place-content-between py-1">
          <span className="text-current font-semibold text-sm">
            {variant.price.toLocaleString()} {CURRENCY}
          </span>
          {selectedItem.id === variant.id ? (
            <div className="flex items-center place-content-end">
              {/* <CiSquareMinus onClick={() => onRemove(variant)} className="cursor-pointer text-current w-10 h-10" /> */}
              <p className="mx-2 text-current animate-quantity-change">{selectedItem.quantity}</p>
              <CiSquarePlus onClick={() => onSelect(variant)} className="cursor-pointer text-current w-10 h-10" />
            </div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
