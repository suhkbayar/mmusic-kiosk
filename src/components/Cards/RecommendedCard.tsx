import React, { useEffect, useState } from 'react';
import { IMenuProduct } from '../../types/menu';
import fallback from '../../assets/images/noImage.jpg';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { CalculateProductMinPrice, isConfigurable } from '../../tools/calculate';
import { useTranslation } from 'react-i18next';
import { MenuItemState } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { IOrderItem } from '../../types';
import { ProductModal } from '..';
import { FaRegUser } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

type Props = {
  product: IMenuProduct;
  orderItem: IOrderItem;
  isFullWidth?: boolean;
};

const Index = ({ product, orderItem, isFullWidth }: Props) => {
  const { t } = useTranslation('language');
  const { participant, config, add, remove } = useCallStore();

  const [visible, setVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, [orderItem?.quantity]);

  const onSelect = (productId: string) => {
    if (product?.state !== MenuItemState.ACTIVE) return;
    if (!product || product.variants.length === 0) return;

    if (product.variants.length > 1) {
      setVisible(true);
    } else {
      product.variants.forEach((item) => {
        if (item.options?.length > 0) {
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

  const getWidthClasses = () => {
    return isFullWidth ? 'w-full' : 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5';
  };

  const getCardStyles = () => ({
    background: config.cardBackgroundColor,
    border: `1px solid ${config?.textColor}`,
  });

  const getTextStyles = () => ({
    color: config?.textColor,
  });

  const renderServings = () => {
    if (!product.variants[0]?.servings || !Array.isArray(product.variants[0].servings)) {
      return null;
    }

    const servings = product.variants[0].servings;
    if (servings.length === 0) return null;

    const servingText =
      servings.length === 1 || servings[0] === servings[1] ? servings[0] : `${servings[0]}-${servings[1]}`;

    return (
      <div className="flex justify-center">
        <div className="flex gap-1 items-center font-medium rounded-md bg-misty opacity-75 px-2">
          <FaRegUser className="text-xs text-white" />
          <span className="text-xs text-white">{servingText}</span>
        </div>
      </div>
    );
  };

  const renderOverlayBadges = () => (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex gap-2 px-2 py-2">
        {product.variants[0].calorie > 0 && (
          <div className="flex justify-center">
            <div className="flex gap-1 font-medium rounded-md bg-misty opacity-75 px-2">
              <span className="text-xs content-center text-white">{product.variants[0].calorie} kcal</span>
            </div>
          </div>
        )}
        {renderServings()}
      </div>
    </div>
  );

  const renderQuantityControls = () => (
    <div className="flex items-center justify-center gap-2">
      <span
        className={`mx-2  text-center font-semibold text-lg ${showAnimation ? 'animate-quantity-change' : ''}`}
        style={{ color: config?.textColor }}
      >
        {orderItem.quantity}
      </span>

      <button
        onClick={() => onSelect(product.productId)}
        className="p-2 rounded-md border-2 border-current hover:bg-gray-100 transition-colors"
        style={{ borderColor: config?.textColor }}
        aria-label="Increase quantity"
      >
        <FiPlus className="text-xl" style={{ color: config?.textColor }} />
      </button>
    </div>
  );

  const renderAddButton = () => (
    <button
      onClick={() => (!isConfigurable(product) ? onSelect(product.productId) : setVisible(true))}
      className="flex font-semibold cursor-pointer justify-center items-center rounded border border-current w-full text-base p-3 hover:bg-gray-50 transition-colors "
      style={{ color: config?.textColor, borderColor: config?.textColor }}
      aria-label="Add to cart"
    >
      <FiPlus className="text-xl mr-1" style={{ color: config?.textColor }} />
    </button>
  );

  return (
    <>
      <div className={`${getWidthClasses()} p-3`}>
        <div
          className={`relative hover:shadow-xl shadow-lg bg-white dark:bg-gray-700 rounded-xl transition-shadow ${
            !participant?.orderable ? 'pb-2' : ''
          }`}
          style={getCardStyles()}
        >
          {product.bonus && <div className="ribbon-2">{product.bonus}</div>}

          {(!config || !config.hideImage) && (
            <div className="relative cursor-pointer rounded-t-xl overflow-hidden" onClick={() => setVisible(true)}>
              <Image
                alt={product.name || 'Product image'}
                src={isEmpty(product.image) ? fallback.src : product.image}
                width={500}
                height={300}
                className="w-full h-40 object-cover"
              />

              {!isEmpty(product.variants) && renderOverlayBadges()}
            </div>
          )}

          <div className="p-4 space-y-4">
            <h2 className="line-clamp-2 font-medium text-base leading-tight" style={{ color: config?.textColor }}>
              {product.name}
            </h2>

            <div className="flex justify-between items-center">
              {!config.hidePrice && (
                <span className="text-base font-semibold" style={{ color: config?.textColor }}>
                  {CalculateProductMinPrice(product.variants, config)}
                </span>
              )}

              {participant?.orderable && (
                <div className="flex-shrink-0">{orderItem ? renderQuantityControls() : renderAddButton()}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {visible && <ProductModal visible={visible} onClose={onCloseProduct} product={product} />}
    </>
  );
};

export default Index;
