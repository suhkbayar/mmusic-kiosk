import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCallStore } from '../contexts/call.store';
import { Carousel } from 'flowbite-react';

const SCREENSAVER_DELAY_MS = 5000; // 5 seconds

interface ScreensaverContextProps {
  screensaverActive: boolean;
  setScreensaverActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScreensaverContext = createContext<ScreensaverContextProps | undefined>(undefined);

export const useScreensaver = () => {
  const context = useContext(ScreensaverContext);
  if (!context) {
    throw new Error('useScreensaver must be used within a ScreensaverProvider');
  }
  return context;
};

interface ScreensaverProviderProps {
  children: React.ReactNode;
}

export const ScreensaverProvider: React.FC<ScreensaverProviderProps> = ({ children }) => {
  const [screensaverActive, setScreensaverActive] = useState(false);

  const { participant } = useCallStore();

  let screensaverTimeout: NodeJS.Timeout;

  const startScreensaverTimeout = useCallback(() => {
    clearTimeout(screensaverTimeout);
    screensaverTimeout = setTimeout(() => setScreensaverActive(true), SCREENSAVER_DELAY_MS);
  }, []);

  const handleInteraction = () => {
    if (screensaverActive) {
      setScreensaverActive(false);
      startScreensaverTimeout();
    }
  };

  useEffect(() => {
    startScreensaverTimeout();
    window.addEventListener('mousemove', handleInteraction);

    return () => {
      clearTimeout(screensaverTimeout);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, []);

  const contextValue: ScreensaverContextProps = {
    screensaverActive,
    setScreensaverActive,
  };

  return (
    <ScreensaverContext.Provider value={contextValue}>
      {children}

      {screensaverActive && (
        <div className="  fixed top-0 left-0 w-full h-full z-[1000] bg-gray-900 ">
          <Carousel>
            {participant.branch.images?.map((image) => (
              <img src={image} alt="..." className="block w-full h-full  bg-center object-cover" />
            ))}
          </Carousel>
        </div>
      )}
    </ScreensaverContext.Provider>
  );
};
