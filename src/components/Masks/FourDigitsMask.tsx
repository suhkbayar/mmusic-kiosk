import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { PATTERN_CODE } from '../../constants/constant';

type Props = {
  setPin: (pin: string) => void;
};

const Index = ({ setPin }: Props) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [values, setValues] = useState<string[]>(['', '', '', '']);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newValues = [...values];
    newValues[index] = value.slice(-1); // Only take the last entered character
    setValues(newValues);

    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && values[index] === '') {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const clearInputs = () => {
    setValues(['', '', '', '']);
    inputRefs.current[0].focus();
  };

  useEffect(() => {
    const pin = values.join('');
    if (pin.length === 4) {
      setPin(pin);
      clearInputs();
    }
  }, [values, setPin]);

  const renderInputs = () => {
    return values.map((value, index) => (
      <input
        key={index}
        value={value}
        inputMode="numeric"
        pattern={PATTERN_CODE}
        required
        className="w-14 h-14 border-gray-800 border-none rounded-md text-lg text-black p-5 text-center bg-gray-100 outline-gray1"
        ref={(ref) => (inputRefs.current[index] = ref)}
        onChange={(e) => handleChange(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
      />
    ));
  };

  return <div className="flex justify-around items-center">{renderInputs()}</div>;
};

export default Index;
