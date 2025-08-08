import React from 'react';
import { debounce } from 'lodash';

type Props = {
  setSearchField: (searchField: string) => void;
  placeHolder: string;
};

const SearchProducts = ({ setSearchField, placeHolder }: Props) => {
  const debounceSearchField = debounce((text: string) => {
    setSearchField(text);
  }, 500);

  const onSearch = (search: string) => {
    debounceSearchField(search);
  };

  return (
    <div className="w-full p-4">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          autoFocus
          onChange={(text) => onSearch(text.target.value)}
          id="default-search"
          className="w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:outline-none focus:shadow-outline 0"
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default SearchProducts;
