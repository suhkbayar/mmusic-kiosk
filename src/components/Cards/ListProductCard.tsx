import React, { useEffect, useState } from 'react';
import { IMenuProduct } from '../../types/menu';
import fallback from '../../assets/images/noImage.jpg';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { imageLoader } from '../../tools/image';
import { Translate } from 'react-auto-translate';
import { CalculateProductOnePrice, isConfigurable } from '../../tools/calculate';
import { FiMinus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { MenuItemState, SOUND_LINK } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { IOrderItem } from '../../types';
import { FiPlus } from 'react-icons/fi';
import AnimateModal from '../Modal/AnimateModal';
import useSound from 'use-sound';
import { MdRemoveRedEye } from 'react-icons/md';

type Props = {
  product: IMenuProduct;
  orderItem: IOrderItem;
};

const Index = ({ product, orderItem }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);
  const { add, remove } = useCallStore();
  const [showAnimation, setShowAnimation] = useState(false);

  const onAnimation = () => {
    setShowAnimation(true);
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  useEffect(() => {
    if (showAnimation) {
      const timeout = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [showAnimation]);

  const onSelect = (productId: string) => {
    if (product?.state !== MenuItemState.ACTIVE) return;
    if (!product || product.variants.length === 0) return;

    if (product.variants.length > 1) {
      setVisible(true);
    } else {
      product.variants.forEach((item) => {
        if (item?.options?.length > 0) {
          setVisible(true);
        } else {
          add(product.variants[0], productId);
        }
      });
    }
  };

  const onRemove = (item) => {
    remove(item);
  };

  const onCloseProduct = () => {
    document.body.style.overflow = 'auto';
    setVisible(false);
  };

  return (
    <>
      <div key={product.id} className=" w-full p-2 ">
        <div className=" hover:shadow-xl  shadow-md  border bg-white border-gray-100   rounded-2xl ">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-2xl">
              <div className="relative pb-[66.666%]">
                <Image
                  onClick={() => {
                    isConfigurable(product) ? setVisible(true) : play();
                    onSelect(product.productId);
                    onAnimation();
                  }}
                  src={product.image || fallback.src}
                  alt={product.name || 'Product image'}
                  loader={imageLoader}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                />
                <div className="absolute right-2  ">
                  <div className="bg-gray-100 mt-2 ml-2 opacity-[.67] p-2 rounded-lg">
                    <MdRemoveRedEye className="text-2xl text-gray-700" onClick={() => setVisible(true)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="m-2 mx-4 mb-0"
            onClick={() => {
              isConfigurable(product) ? setVisible(true) : play();
              onSelect(product.productId);
              onAnimation();
            }}
          >
            <h2 className="line-clamp-2 content-center text-2xl	 h-16 leading-4 md:leading-tight font-bold    text-gray-500">
              <Translate>{product.name} </Translate>
            </h2>
          </div>
          <span
            onClick={() => {
              isConfigurable(product) ? setVisible(true) : play();
              onSelect(product.productId);
              onAnimation();
            }}
            className="block text-gray-500 text-xl font-semibold text-start   ml-4 "
          >
            {CalculateProductOnePrice(product.variants)}
          </span>
          {isConfigurable(product) ? (
            <div className="flex  justify-end items-center p-4">
              <button
                onClick={() => setVisible(true)}
                className="flex button cursor-pointer place-content-center items-center rounded-xl  text-white bg-macDonald  text-sm py-3 px-6"
              >
                <FiPlus className="text-white  text-xl" />
              </button>
            </div>
          ) : (
            <>
              {orderItem ? (
                <div className="flex  p-1 items-center  justify-center mt-3  ">
                  <div className="flex  w-full  rounded-xl   place-content-between items-center mb-[10px] mx-3">
                    <div
                      onClick={() => {
                        play();
                        onRemove(product);
                      }}
                      className="bg-white border button-variant border-gray-200  rounded-xl py-3 px-6 "
                    >
                      <FiMinus className="text-xl" />
                    </div>
                    <p className={`mx-2 text-xl text-gray-500 `}>{orderItem.quantity}</p>

                    <div
                      onClick={() => {
                        play();
                        onSelect(product.productId);
                      }}
                      className="bg-macDonald  button rounded-xl py-3 px-6 text-white"
                    >
                      <FiPlus className="text-xl" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex  justify-end items-center p-4">
                  <button
                    onClick={() => {
                      play();
                      onSelect(product.productId);
                      onAnimation();
                    }}
                    className="flex button cursor-pointer place-content-center items-center rounded-xl  text-white bg-macDonald  text-sm py-3 px-6"
                  >
                    <FiPlus className="text-white  text-xl" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <AnimateModal visible={visible} onClose={() => onCloseProduct()} product={product} />
    </>
  );
};

export default Index;
