import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import MiniSearch from 'minisearch';
import dynamic from 'next/dynamic';
import { TfiClose } from 'react-icons/tfi';
import { useCallStore } from '../../contexts/call.store';
import { toLatinConvert } from '../../tools/toLatin';
import { SearchProducts } from '../../components';
import ResultSkeleton from '../../components/Skelton/ResultSkelton';

const ProductList = dynamic(() => import('../../components/Products/ProductList'), {
  loading: () => <ResultSkeleton />,
});

const Index = () => {
  const router = useRouter();
  const { participant } = useCallStore();
  const [showContent, setShowContent] = useState(false);
  const [searchField, setSearchField] = useState<string>();

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 0);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  const goBack = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  if (!participant) return null;

  const products = participant.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  const miniSearch = new MiniSearch({
    fields: ['nameEn', 'descriptionEn'],
    storeFields: [
      'name',
      'description',
      'variants',
      'image',
      'bonus',
      'specification',
      'productId',
      'withNote',
      'state',
      'bonus',
    ],
    searchOptions: {
      boost: { name: 2, description: 1 },
      fuzzy: 0.3,
      prefix: true,
    },
  });

  miniSearch.addAll(
    products.map((item) => ({
      ...item,
      nameEn: toLatinConvert(item.name),
      descriptionEn: toLatinConvert(item.description),
    })),
  );

  function getSelectedProducts(participant, searchField, miniSearch) {
    if (!isEmpty(searchField)) {
      const results = miniSearch.search(searchField);
      return results.length > 0 ? [results[0]] : [];
    }

    const category = participant.menu.categories.flatMap((category) => category.products);
    if (category) {
      const subCategory = category.children?.flatMap((subCategory) => subCategory.products);
      return subCategory?.products ?? category.products ?? [];
    }
    return [];
  }

  return (
    <>
      {showContent && (
        <>
          <div className="flex items-center">
            <SearchProducts setSearchField={setSearchField} placeHolder="Хоолны нэр хайх..." />
            <TfiClose onClick={goBack} className="cursor-pointer text-misty mr-4 w-5 h-5" />
          </div>
          <div className="w-full p-4">
            {getSelectedProducts(participant, searchField, miniSearch)?.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Index;
