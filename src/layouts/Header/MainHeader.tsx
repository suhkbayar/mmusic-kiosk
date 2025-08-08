import { IoSettingsSharp } from 'react-icons/io5';
import ToggleLanguage from '../../components/Button/ToggleLanguage';
import { IMenuCategory } from '../../types';
import { isEmpty } from 'lodash';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import { useState } from 'react';
import LoginDrawer from '../../components/LoginDrawer/LoginDrawer';

type Props = {
  selectedSubCategoryId: string;
  handleSubCategorySelect: (id: string) => void;
  subCategories: any[];
  selectedCategory: IMenuCategory;
};

const MainHeader = ({ handleSubCategorySelect, selectedCategory, subCategories, selectedSubCategoryId }: Props) => {
  const [settings, setSettings] = useState(false);
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  return (
    <div className="fixed top-0 w-full p-4 bg-white border border-gray-100 shadow-sm animate__animated ">
      <div className=" flex justify-between	  ml-[10rem] ">
        <div className="grid">
          <div className="p-4   rounded-lg  text-2xl font-bold   text-macDonald">
            {selectedCategory?.name.toLocaleUpperCase()}
          </div>
          {!isEmpty(subCategories) && (
            <div className="flex flex-nowrap gap-4 mt-4 ml-2 ">
              {subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className={`p-4 px-6 rounded-xl cursor-pointer text-xl font-semibold hover:shadow-lg  ${
                    selectedSubCategoryId === subCategory.id
                      ? 'bg-macDonald dark:bg-gray-600 text-white dark:text-white'
                      : 'text-gray-90 0 dark:text-white  border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    play();
                    handleSubCategorySelect(subCategory.id);
                  }}
                >
                  {subCategory.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex  gap-3 items-center self-start  mt-3 ">
          <ToggleLanguage />
          <div className="flex">
            <div className="p-2 rounded-full border border-gray-100 w-[42px] h-[42px] bg-gray-100">
              <IoSettingsSharp
                onClick={() => setSettings(!settings)}
                className="color-current text-gray1 dark:text-white w-6 h-6   "
              />
            </div>
          </div>
        </div>
      </div>
      {settings && <LoginDrawer setShow={setSettings} show={settings} />}
    </div>
  );
};

export default MainHeader;
