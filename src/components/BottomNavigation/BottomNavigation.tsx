import React from 'react';

import { OrderTotalButton } from '..';

const BottomNavigation = () => {
  return (
    <>
      <div className="w-full  block ">
        <section id="bottom-navigation" className="block z-20	 fixed inset-x-0 bottom-0 ">
          <OrderTotalButton />
        </section>
      </div>
    </>
  );
};

export default BottomNavigation;
