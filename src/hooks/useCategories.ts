import { useState, useEffect } from 'react';
import { IMenuCategory } from '../types';
import { isCurrentlyOpen } from '../utils';

export const useCategories = (menuCategories: IMenuCategory[] | undefined) => {
  const [categories, setCategories] = useState<IMenuCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');

  useEffect(() => {
    if (menuCategories) {
      const filteredCategories = menuCategories.filter((category) => {
        const isCategoryOpen = isCurrentlyOpen(category.timetable);

        const hasActiveProducts = category.products.some((product) => product.state === 'ACTIVE');

        if (category.children?.length) {
          const hasActiveClosedChildren = category.children.some((child) =>
            child.products.some((product) => product.state === 'ACTIVE'),
          );

          return isCategoryOpen && (hasActiveProducts || hasActiveClosedChildren);
        }

        return isCategoryOpen && hasActiveProducts;
      });

      setCategories(filteredCategories);
    }
  }, [menuCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
      if (categories[0].children?.length > 0) {
        setSelectedSubCategoryId(categories[0].children[0].id);
      } else {
        setSelectedSubCategoryId('');
      }
    }
  }, [categories]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category?.children?.length) {
      setSelectedSubCategoryId(category.children[0].id);
    } else {
      setSelectedSubCategoryId('');
    }
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  return {
    categories,
    selectedCategoryId,
    selectedSubCategoryId,
    handleCategorySelect,
    handleSubCategorySelect,
  };
};
