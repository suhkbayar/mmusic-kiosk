import React, { useState } from 'react';
import { IMenuProduct } from '../../types';
import { IoIosArrowForward } from 'react-icons/io';
import { isEmpty } from 'lodash';
import { ProductModal, SearchEmpty } from '..';

type Props = {
  product: IMenuProduct;
};

const Index = ({ product }: Props) => {
  const [visible, setVisible] = useState(false);

  if (isEmpty(product)) return <SearchEmpty />;

  const showProduct = () => {
    setVisible(true);
  };

  const onCloseProduct = () => {
    document.body.style.overflow = 'auto';
    setVisible(false);
  };

  return (
    <>
      <div
        onClick={() => showProduct()}
        className="w-full cursor-pointer mt-4 flex items-center  bg-white rounded-lg place-content-between "
      >
        <div className="flex items-center">
          <img src={product.image} className=" h-16 rounded-lg " alt={product.name} />
          <div className="ml-2 h-full ">
            <h2 className="text-sm font-bold text-misty mb-2 ">{product.name}</h2>
            <p className="text-xs text-grayish">{product.description}</p>
          </div>
        </div>
        <div>
          <IoIosArrowForward className="text-lightGray h-6 w-6" />
        </div>
      </div>

      {visible && <ProductModal visible={visible} onClose={() => onCloseProduct()} product={product} />}
    </>
  );
};

export default Index;
