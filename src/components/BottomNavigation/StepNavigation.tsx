import React from 'react';
import { BiArrowBack, BiRightArrowAlt } from 'react-icons/bi';

const Index = () => {
  return (
    <>
      <div className="w-full  block xl:hidden">
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-transparent ">
          <div className="flex place-content-between p-4  ">
            <div className="p-3 bg-gray-200 rounded-full  ">
              <BiArrowBack className="text-gray-500 text-3xl" />
            </div>
            <div className="flex place-items-center p-3 pr-2 pl-4 bg-gray-200 rounded-full  ">
              <p className="text-gray-700">next</p>
              <BiRightArrowAlt className="text-gray-500 text-3xl" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
