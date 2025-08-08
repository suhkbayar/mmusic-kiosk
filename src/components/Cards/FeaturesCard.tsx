import React from 'react';

type Props = {
  imgUrl: string;
  name: string;
  desc: string;
};

const FeaturesCard = ({ imgUrl, name, desc }: Props) => {
  return (
    <>
      <div className="carousel-focus flex items-center flex-col relative bg-white mx-5 my-5 px-0 py-0 rounded-lg shadow-lg w-96">
        <img className="h-44 w-full rounded-lg shadow-2xl" src={imgUrl} alt="Img" />
        <div className="mt-5 ml-5 mb-5 w-full text-start">
          <span className="text-xs font-bold inline-block py-2 px-2 uppercase rounded text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1">
            {name}
          </span>

          <p className="text-sm mt-5 text-gray-500">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default FeaturesCard;
