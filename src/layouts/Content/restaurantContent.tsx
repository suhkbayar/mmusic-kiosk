import MiniSearch from 'minisearch';
import React, { useEffect, useState } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { isEmpty } from 'lodash';
import { toLatinConvert } from '../../tools/toLatin';
import dynamic from 'next/dynamic';
import CardSkelton from '../../components/Skelton/CardSkelton';
import { IMenuCategory } from '../../types';

const SideBarCategories = dynamic(() => import('../../components/Categories/SideBarCategories'));
const Products = dynamic(() => import('../../components/Products/Products'), {
  loading: () => <CardSkelton />,
});
const SearchProducts = dynamic(() => import('../../components/SearchBar/SearchBarProducts'));
const Categories = dynamic(() => import('../../components/Categories/Categories'));
const DraftOrder = dynamic(() => import('../../components/Order/DraftOrder'));

const Index = () => {
  const { participant } = useCallStore();
  const [searchField, setSearchField] = useState<string>();
  const [categories, setCategories] = useState<IMenuCategory[]>();

  useEffect(() => {
    if (participant.menu.categories.length > 0) {
      setCategories(
        participant.menu.categories.filter((category) => {
          const allProductsInactive = category.products.every((product) => product.state !== 'ACTIVE');

          if (!isEmpty(category.children)) {
            const allChildrenInactive = category.children.every((childCategory) =>
              childCategory.products.every((product) => product.state !== 'ACTIVE'),
            );

            return !(allProductsInactive && allChildrenInactive);
          } else {
            return !allProductsInactive;
          }
        }),
      );
    }
  }, [participant]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => {
    const firstCategory = categories && categories[0];
    return firstCategory ? firstCategory.id : '';
  });

  useEffect(() => {
    if (categories) {
      const firstCategory = categories[0];
      setSelectedCategoryId(firstCategory.id);
    }
  }, [categories]);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(() => {
    const category = categories && categories.find((c) => c.id === selectedCategoryId);
    const firstSubCategory = category?.children[0];
    return firstSubCategory ? firstSubCategory.id : '';
  });

  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories && categories.find((c) => c.id === selectedCategoryId);
      if (category?.children.length > 0) {
        const firstSubCategory = category.children[0];
        setSelectedSubCategoryId(firstSubCategory.id);
      }
    }
  }, [selectedCategoryId, participant]);

  const products =
    categories &&
    categories.flatMap((category) => {
      const mainCategoryProducts = category.products;
      const childCategoryProducts = category.children.flatMap((child) => child.products);

      return [...mainCategoryProducts, ...childCategoryProducts];
    });

  let miniSearch = new MiniSearch({
    fields: ['nameEn', 'descriptionEn'],
    storeFields: ['name', 'description', 'variants', 'image', 'bonus', 'specification'],
    searchOptions: {
      boost: { name: 2, description: 1 },
      fuzzy: 0.3,
      prefix: true,
    },
  });

  products &&
    miniSearch.addAll(
      products.map((item) => ({
        ...item,
        nameEn: toLatinConvert(item.name),
        descriptionEn: toLatinConvert(item.description),
      })),
    );

  function getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId) {
    if (!isEmpty(searchField)) {
      const results = miniSearch.search(searchField);
      return results.length > 0 ? [results[0]] : [];
    }

    const category = categories && categories.find((category) => category.id === selectedCategoryId);
    if (category) {
      const subCategory = category.children?.find((subCategory) => subCategory.id === selectedSubCategoryId);
      return subCategory?.products ?? category.products ?? [];
    }
    return [];
  }

  return (
    <>
      <div className="place-items-start hidden xl:grid grid-cols-10">
        <div className="col-span-2 w-full">
          {categories && (
            <SideBarCategories
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              selectedSubCategoryId={selectedSubCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />
          )}
        </div>
        <div className="col-span-5  w-full ">
          <SearchProducts setSearchField={setSearchField} placeHolder="Рестораны нэр, хоолны нэр хайх..." />
          <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
        </div>
        <div className=" col-span-3 w-full  mt-4 ">
          <DraftOrder />
        </div>
      </div>
      <div className="block xl:hidden">
        {categories && (
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedSubCategoryId={setSelectedSubCategoryId}
          />
        )}

        <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
      </div>
    </>
  );
};

export default Index;
