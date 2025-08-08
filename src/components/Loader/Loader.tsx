import React from 'react';
import loader from '../../assets/images/logoLoader.gif';

const Index = () => {
  return (
    <div className="absolute z-50 w-3/5 inset-2/4">
      <img src={loader.src} height={50} width={50} />
    </div>
  );
};

export default Index;
