import { useEffect, useState } from 'react';
import { IMenuCategory, IMenuProduct } from '../../types';
import { useCallStore } from '../../contexts/call.store';
import { ListProduct, SideCategories } from '..';
import OrderFooter from '../Button/OrderFooter';
import { isEmpty } from 'lodash';
import MainHeader from '../../layouts/Header/MainHeader';
import { useCategories } from '../../hooks/useCategories';

const MainContent = () => {
  const { participant, order } = useCallStore();
  const { categories, selectedCategoryId, selectedSubCategoryId, handleCategorySelect, handleSubCategorySelect } =
    useCategories(participant?.menu?.categories);

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
  const subCategories = selectedCategory?.children ?? [];
  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === selectedSubCategoryId);
  const products = selectedSubCategory?.products ?? selectedCategory?.products ?? [];

  const renderProducts = (products: IMenuProduct[]) => {
    return products.map((product) => (
      <div key={product.id} className="grid">
        <ListProduct
          product={product}
          orderItem={order?.items?.find((item) => item?.productId === product.productId)}
        />
      </div>
    ));
  };

  return (
    <div className="bg-white">
      <SideCategories
        categories={categories}
        logo={participant?.branch.logo}
        selectedCategoryId={selectedCategoryId}
        handleCategorySelect={handleCategorySelect}
      />
      <main className="ml-40 relative">
        <div className="p-4">
          <div
            className={`grid ${
              isEmpty(subCategories) ? 'mt-24' : 'mt-44'
            } mb-40 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 bg-white h-full overflow-y-auto`}
          >
            {renderProducts(products)}
          </div>
        </div>
      </main>
      <OrderFooter />
      <MainHeader
        selectedCategory={selectedCategory}
        subCategories={subCategories}
        selectedSubCategoryId={selectedSubCategoryId}
        handleSubCategorySelect={handleSubCategorySelect}
      />
    </div>
  );
};

export default MainContent;
