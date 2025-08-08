import React from 'react';

type Props = {
  icon?: any;
  text: any;
  color?: any;
  onClick?: () => void;
};

const Text = ({ icon, text, onClick, color }: Props) => {
  return (
    <>
      <div onClick={onClick} className="flex items-center ">
        {icon}
        <p className={`text-center ${color ?? 'text-gray1'} hover:text-gray cursor-pointer `}>{text}</p>
      </div>
    </>
  );
};

export default Text;
