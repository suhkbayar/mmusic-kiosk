import { useState } from 'react';
import ToggleLanguage from '../../components/Button/ToggleLanguage';
import WifiModal from '../../components/Modal/WifiModal';
import { useCallStore } from '../../contexts/call.store';

const Index = () => {
  const { participant } = useCallStore();
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex justify-between		 gap-4 mb-4	">
      <div className="   text-start    flex place-content-start">
        <img src={participant?.branch.logo} className="w-36 h-full object-cover rounded-2xl max-w-xl" alt="Logo" />
      </div>
      <div className="    text-end    flex place-content-end">
        <div className="w-16 flex items-center place-content-center" onClick={() => setVisible(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            width="52"
            height="52"
            aria-hidden="true"
            role="img"
            // style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))', borderRadius: '50%' }}
          >
            <circle cx="14" cy="14" r="14" fill="#1961FF" />
            <path
              d="M4.5 11a16 16 0 0 1 19 0"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M7.5 14.5a11 11 0 0 1 13 0"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M10.5 18a6 6 0 0 1 7 0"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <circle cx="14" cy="22" r="1.5" fill="white" />
          </svg>
        </div>
        <div className="w-16 place-content-center">
          <ToggleLanguage />
        </div>
      </div>

      <WifiModal open={visible} onClose={() => setVisible(false)} />
    </div>
  );
};

export default Index;
