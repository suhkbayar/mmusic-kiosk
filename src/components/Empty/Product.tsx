import React from 'react';
import { SiItunes } from 'react-icons/si';

const Index = () => {
  return (
    <>
      <div
        role="status"
        className="p-4 space-y-4 flex place-content-center place-items-center w-full  h-[50vh] rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse  md:p-6 md:w-full "
      >
        <div>
          <SiItunes className="text-gray-700 w-32 h-32" />
          <span className="text-gray1">Олдсонгүй</span>
        </div>
      </div>
    </>
  );
};

export default Index;
