import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import fallback from '../../assets/images/noImage.jpg';
import { imageLoader } from '../../tools/image';
import { useTranslation } from 'react-i18next';
import { useCallStore } from '../../contexts/call.store';
import { IOrderItem } from '../../types';
import { generateUUID } from '../../tools/generate';
import { calculateOrderItem, isConfigurable } from '../../tools/calculate';
import { OptionCard } from '..';
import VerticalVariantCard from '../Cards/VerticalVariantCard';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CURRENCY } from '../../constants/currency';
import ModalHeader from '../../layouts/Header/modalHeader';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import { Translate } from 'react-auto-translate';
import { GOOGLE_CLOUD_KEY } from '../../constants/constanApi';

type Props = {
  visible: boolean;
  product: any;
  onClose: () => void;
};

const AnimateModal = ({ visible, onClose, product }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { addOrderItem, addOrderItemOptional } = useCallStore();
  const { t, i18n } = useTranslation('language');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrderItem>();
  const [visibleValues, setVisibleValues] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    if (visible) {
      const item: IOrderItem = {
        id: product.variants[0].id,
        uuid: generateUUID(),
        productId: product.productId,
        name: product.variants[0].name,
        reason: '',
        state: 'DRAFT',
        quantity: 1,
        options: [],
        price: product.variants[0].salePrice,
        discount: 0,
        image: '',
      };
      setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const translateText = async () => {
        const text = product.specification;
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_KEY}`,
          {
            method: 'POST',
            body: JSON.stringify({
              q: text,
              target: i18n.language,
            }),
          },
        );
        const data = await response.json();
        const translatedText = data.data?.translations[0].translatedText ?? '';
        setTranslatedText(translatedText);
      };

      translateText();
    }
  }, [visible]);

  const onSelect = (variant: any) => {
    if (selectedItem.id === variant.id) {
      setSelectedItem({ ...selectedItem, quantity: selectedItem.quantity + 1 });
    } else {
      const item: IOrderItem = {
        id: variant.id,
        uuid: generateUUID(),
        productId: product.productId,
        name: variant.name,
        reason: '',
        state: 'DRAFT',
        quantity: 1,
        options: [],
        price: variant.salePrice,
        discount: 0,
        image: '',
      };
      setSelectedItem(item);
    }
  };

  const onSelectOption = (option: any) => {
    setSelectedItem((prevSelectedItem) => {
      const isOptionSelected = prevSelectedItem.options.some((selectedOption) => selectedOption.id === option.id);

      if (isOptionSelected) {
        return {
          ...prevSelectedItem,
          options: prevSelectedItem.options.filter((item) => item.id !== option.id),
        };
      }

      const updatedOptions = [...prevSelectedItem.options, option];

      return {
        ...prevSelectedItem,
        options: updatedOptions,
      };
    });
  };

  const onRemove = () => {
    if (selectedItem.quantity > 1) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });
    }
  };

  const addItem = () => {
    if (isConfigurable(product)) {
      addOrderItemOptional(selectedItem);
    } else {
      addOrderItem(selectedItem);
    }
    onClose();
  };

  const hasOptions = product.variants.some((variant: any) => variant.options?.length > 0);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <div className={`wrap z-30  ${visible ? 'active' : ''}`}>
        <div className="content overflow-auto max-h-screen px-10 py-8	">
          <ModalHeader />
          <div className="grid grid-cols-8 gap-4	">
            <div className="  col-span-4 text-center  sm:ml-4  flex place-content-center">
              <div className=" items-start w-96 flex place-content-center object-cover rounded-md ">
                <Image
                  src={isEmpty(product.image) ? fallback.src : product.image}
                  alt="stew"
                  loader={imageLoader}
                  width={500}
                  height={1}
                  placeholder="empty"
                  style={{ borderRadius: '40px', width: 'auto', height: 'auto' }}
                  priority={true}
                />
              </div>
            </div>
            <div className="grid col-span-4 content-between">
              <div className="mt-4 items-start flex ">
                <p className=" font-semibold  text-3xl text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                  <Translate>{product.name}</Translate>
                </p>
              </div>
              <div>
                <div
                  className={`text-start font-normal  text-gray-700 text-md mt-3  ${
                    isExpanded ? 'line-clamp-none' : 'line-clamp-5'
                  } `}
                  dangerouslySetInnerHTML={{ __html: translatedText }}
                />
                {!isEmpty(product.specification) && (
                  <button onClick={toggleExpand} className=" text-md text-blue-500 hover:underline">
                    {isExpanded ? t('mainPage.collapse') : t('mainPage.see_more')}
                  </button>
                )}
              </div>
              <span className="text-macDonald  p-4 font-semibold text-center text-2xl">
                {product.variants.length === 1 && (
                  <>
                    {product.variants[0].salePrice.toLocaleString()} {CURRENCY}
                  </>
                )}
              </span>
            </div>
          </div>
          <>
            {selectedItem && (
              <div className="items-center justify-items-center my-8 ">
                <div className="flex items-center place-content-end ">
                  <div
                    onClick={() => {
                      play();
                      onRemove();
                    }}
                    className="bg-white border button-variant border-gray-200  rounded-xl py-3 px-6 "
                  >
                    <FiMinus className="text-2xl" />
                  </div>
                  <p className="mx-4 text-gray-700 text-xl font-semibold animate-quantity-change">
                    {selectedItem.quantity}
                  </p>
                  <div
                    onClick={() => {
                      play();
                      onSelect(selectedItem);
                    }}
                    className="bg-macDonald  button rounded-xl py-3 px-6 text-white"
                  >
                    <FiPlus className="text-2xl" />
                  </div>
                </div>
              </div>
            )}

            {(product.variants.length > 1 || hasOptions) && (
              <div className=" bg-gray-50 grid rounded-2xl mt-4 overflow-auto">
                <div className="pt-4 pb-40	 overflow-y-auto">
                  {product.variants.length > 1 && (
                    <>
                      <div className="flex justify-center text-xl text-gray-500">{t('mainPage.Option')}</div>
                      <div className="flex overflow-y-auto justify-center  flex-wrap mt-3 space-x-4">
                        {product.variants?.map((variant) => (
                          <VerticalVariantCard
                            onSelect={onSelect}
                            key={variant.id}
                            variant={variant}
                            onRemove={onRemove}
                            selectedItem={selectedItem}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {selectedItem && product.variants.some((variant) => variant.id === selectedItem.id) && (
                    <div className="grid grid-cols-1 mt-2">
                      {!isEmpty(product.variants.find((variant) => variant.id === selectedItem.id)?.options) && (
                        <div className="flex justify-center text-xl text-gray-500">{t('mainPage.additional')}</div>
                      )}
                      <div className="flex overflow-y-auto justify-center flex-wrap mt-3 space-x-4">
                        {product.variants
                          .find((variant) => variant.id === selectedItem.id)
                          ?.options?.map((option) => (
                            <OptionCard
                              setVisibleValues={setVisibleValues}
                              visibleValues={visibleValues}
                              onSelect={onSelectOption}
                              isSelected={selectedItem.options.some(
                                (selectedOption) => selectedOption.id === option.id,
                              )}
                              key={option.id}
                              value={
                                selectedItem.options.find((selectedOption) => selectedOption.id === option.id)?.value
                              }
                              option={option}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        </div>
        <div
          className={`w-full z-40 absolute  bottom-0 p-4 grid bg-white border-gray-100 shadow-lg border rounded-t-2xl  animate__animated ${
            visible ? 'animate__fadeIn' : 'animate__fadeOut'
          } `}
        >
          <div className=" flex justify-between	 w-full">
            <div className="flex justify-start">
              <div
                className="bg-gray-200 py-4 px-6 rounded-xl text-xl text-gray-500  "
                onClick={() => {
                  play();
                  onClose();
                }}
              >
                {t('mainPage.GoBack')}
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="bg-macDonald py-4 px-6 flex gap-4 rounded-xl text-xl text-white  "
                onClick={() => {
                  play();
                  addItem();
                }}
              >
                <span>
                  {t('mainPage.Order')} ({selectedItem?.quantity})
                </span>
                <span>
                  {calculateOrderItem(selectedItem).toLocaleString()} {CURRENCY}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimateModal;
