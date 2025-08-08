import React from 'react';

const NavigationSkelton = () => {
  return (
    <div className="block fixed bg-gray-100 inset-x-0 bottom-0 dark:bg-white">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 md:mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 md:mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
  );
};

export default NavigationSkelton;
