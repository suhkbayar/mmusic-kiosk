import React from 'react';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import fallback from '../../assets/images/noImage.jpg';
import { imageLoader } from '../../tools/image';
import { BannerSystem, BannerType, IBanner } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_BANNERS } from '../../graphql/query';

interface Props {
  types: BannerType[];
}

const SmartBanner = ({ types }: Props) => {
  const { data } = useQuery<{ getBanners: IBanner[] }>(GET_BANNERS, {
    variables: { system: BannerSystem.K, types: [BannerType.M, BannerType.E] },
  });

  // if (!data?.getBanners || data?.getBanners.length < 1) return <></>;
  return <></>;
  // return (
  //   <div className="w-full p-2">
  //     <Carousel className="w-full" style={{ height: '172px' }}>
  //       {data?.getBanners
  //         .filter((item) => types.includes(item.type))
  //         .map((item, index) => (
  //           <div
  //             key={index}
  //             className="flex gap-4 items-center justify-between hover:shadow-xl shadow-lg bg-white  rounded-md"
  //           >
  //             <Image
  //               className="rounded-md w-full"
  //               alt="stew"
  //               key={index}
  //               src={isEmpty(item.image) ? fallback.src : item.image}
  //               loader={imageLoader}
  //               width={350}
  //               height={172}
  //               priority={true}
  //               style={{ height: '172px' }}
  //             />
  //           </div>
  //         ))}
  //     </Carousel>
  //   </div>
  // );
};

export default SmartBanner;
