import React from 'react';
import { IMenuVariant } from '../../types/menu';
import { Translate } from 'react-auto-translate';
import { IOrderItem } from '../../types';
import { CURRENCY } from '../../constants/currency';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';

type Props = {
  variant: IMenuVariant;
  selectedItem: IOrderItem;
  onSelect: (variant: IMenuVariant) => void;
  onRemove: (variant: IMenuVariant) => void;
};

const Index = ({ variant, selectedItem, onSelect, onRemove }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  if (!selectedItem) return;

  const isSelected = selectedItem.id === variant.id;

  const onAdd = () => {
    play();
    onSelect(variant);
  };

  return (
    <div
      onClick={() => !isSelected && onAdd()}
      className={` flex-shrink-0 grid max-w-full button-variant  content-between  rounded-lg  p-8 m-2  ${
        isSelected ? 'bg-macDonald' : 'bg-gray-200  '
      }`}
    >
      <div className="flex justify-center ">
        <h2 className="line-clamp-2   font-semibold text-misty text-xl ">
          <Translate>{variant.name} </Translate>
        </h2>
      </div>

      <div className="flex items-center py-1 justify-center">
        <span className={` ${isSelected ? 'text-white' : ' text-macDonald '} font-semibold text-center text-lg`}>
          {variant.price.toLocaleString()} {CURRENCY}
        </span>
      </div>
    </div>
  );
};

export default Index;
