import { useEffect } from 'react';

const HideKeyboardOnScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement) {
        activeElement.blur();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default HideKeyboardOnScroll;
