import React from 'react';
import { Sidebar } from 'flowbite-react';
import { IMenuCategory } from '../../types';
import { useTranslation } from 'react-i18next';
import { MdMenuBook } from 'react-icons/md';
import { isEmpty } from 'lodash';

type Props = {
  selectedCategoryId: string;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
  selectedSubCategoryId: string;
  setSelectedSubCategoryId: (selectedSubCategoryId: string) => void;
  categories: IMenuCategory[];
};

const SideBarCategories = ({
  selectedSubCategoryId,
  setSelectedSubCategoryId,
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
}: Props) => {
  const { t } = useTranslation('language');
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(categories.find((category) => category.id === categoryId)!.children[0]?.id);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };
  return (
    <Sidebar aria-label=" Sidebar with multi-level dropdown example w-full" className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={MdMenuBook}>{t('mainPage.Category')}</Sidebar.Item>
          {categories.map((category) => {
            if (!isEmpty(category.children)) {
              return (
                <Sidebar.Collapse
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  label={category.name}
                  open={selectedCategoryId === category.id}
                  className={selectedCategoryId === category.id ? 'bg-gray-100 ' : 'bg-white '}
                >
                  {category.children.map((child) => (
                    <Sidebar.Item
                      className={selectedSubCategoryId === child.id ? 'bg-gray-100 ' : 'bg-white '}
                      onClick={() => handleSubCategoryClick(child.id)}
                      key={child.id}
                    >
                      {child.name}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              );
            } else {
              return (
                <Sidebar.Item
                  className={selectedCategoryId === category.id ? 'bg-gray-100  ' : 'bg-white '}
                  onClick={() => handleCategoryClick(category.id)}
                  key={category.id}
                >
                  {category.name}
                </Sidebar.Item>
              );
            }
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBarCategories;
