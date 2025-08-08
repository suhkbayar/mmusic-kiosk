import React from 'react';
import { CURRENCY } from '../../constants/currency';
import { OptionValuesModal } from '..';
import { isEmpty } from 'lodash';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';

type Props = {
  option: any;
  onSelect: (option: any) => void;
  value: string;
  isSelected: boolean;
  visibleValues: boolean;
  setVisibleValues: (visibleValues: boolean) => void;
};

const Index = ({ option, onSelect, isSelected, value, setVisibleValues, visibleValues }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  const onSelectOption = (option: any) => {
    play();
    if (!isEmpty(option.values) && isEmpty(value)) {
      return setVisibleValues(true);
    }

    onSelect(option);
  };

  const onSelectValue = (value: any) => {
    onSelect({ ...option, value: value });
    setVisibleValues(false);
  };

  return (
    <>
      <div
        onClick={() => onSelectOption(option)}
        className={` flex-shrink-0 grid max-w-full button-variant  content-between  rounded-lg  p-2 px-8 m-2  ${
          isSelected ? 'bg-macDonald' : 'bg-gray-200   '
        }`}
      >
        <div className="flex">
          <span className="line-clamp-2  font-semibold text-misty text-lg">{option.name}</span>
        </div>
        <span className="text-white text-md">{value ?? ' '}</span>
        <span className={`font-semibold ${isSelected ? 'text-white' : 'text-macDonald'} text-md`}>
          {option.price.toLocaleString()} {CURRENCY}
        </span>
      </div>
      {visibleValues && option.values && (
        <OptionValuesModal
          visible={visibleValues}
          values={option.values}
          onSelectValue={onSelectValue}
          onClose={() => setVisibleValues(false)}
        />
      )}
    </>
  );
};

export default Index;
