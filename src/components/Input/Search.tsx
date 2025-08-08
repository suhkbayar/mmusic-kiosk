import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onSearch: (search: string) => void;
};

const Index = ({ onSearch }: Props) => {
  const { t } = useTranslation('language');

  return (
    <>
      <div className="">
        <div className=" mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full p-3">
              <div className="relative">
                <svg
                  className="w-5 h-5 text-gray-600 absolute text-gray-400 top-[10px] left-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                </svg>
                <input
                  onChange={(e) => onSearch(e.target.value)}
                  type="text"
                  className="bg-white h-10 w-full px-8 rounded-lg focus:outline-none hover:cursor-pointer px-4 py-2 text-gray1 transition duration-300 border-r border-t border-b border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                  name=""
                  placeholder={t('mainPage.SearchSong')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
