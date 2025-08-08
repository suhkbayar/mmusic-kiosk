import React from 'react';
import { CgSpinner } from 'react-icons/cg';

type Props = {
  loading?: boolean;
  text: string;
  onClick?: () => void;
};

const Index = ({ loading, text, onClick }: Props) => {
  return (
    <button
      type="submit"
      disabled={loading}
      onClick={onClick}
      className={`w-full  flex items-center  place-content-center rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300 ${
        loading && 'opacity-75'
      } `}
    >
      {loading && <CgSpinner className="text-lg mr-1 animate-spin" />}
      {text}
    </button>
  );
};

export default Index;
