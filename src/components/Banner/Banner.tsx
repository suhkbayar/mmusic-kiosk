import React from 'react';
import { IBranch } from '../../types';
import RestauarantCover from '../Cover/RestauarantCover';

type Props = {
  branch: IBranch;
};

const Index = ({ branch }: Props) => {
  return (
    <>
      <div className=" bg-slate-50 h-[11rem]">
        <div
          style={{
            background: `url(${branch.banner}) no-repeat scroll 0 0 / cover`,
            backgroundPosition: 'center',
            scrollBehavior: 'smooth',
            overscrollBehaviorBlock: 'inherit',
          }}
          className=" brightness-50 block w-full h-full bg-cover bg-center object-cover "
        ></div>
      </div>
      <RestauarantCover />
    </>
  );
};

export default Index;
