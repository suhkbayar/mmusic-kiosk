import React from 'react';
import { Translate } from 'react-auto-translate';

type Props = {
  text: string;
};

const Index = ({ text }: Props) => {
  return (
    <div className="bg-paleBlue border place-items-center border-paleBlue rounded text-cyanBlue text-sm p-4 flex items-start">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full">
        <p className="text-xl">
          <Translate>{text}</Translate>
        </p>
      </div>
    </div>
  );
};

export default Index;
