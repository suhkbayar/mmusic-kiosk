import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';
import { useEffect } from 'react';

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    if (isDarkTheme) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  };

  useEffect(() => {
    if (document) {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    }
  }, []);

  return (
    <>
      <div className="place-self-center ">
        <BsFillMoonFill
          fill="#999"
          className={isDarkTheme ? 'hidden' : 'w-5 h-5 hover:bg-dark place-self-center '}
          onClick={() => toggleTheme()}
        />
        <BsSun
          fill="#999"
          className={!isDarkTheme ? 'hidden' : 'w-5 h-5 place-self-center text-gray1  '}
          onClick={() => toggleTheme()}
        />
      </div>
    </>
  );
};

export default ToggleButton;
