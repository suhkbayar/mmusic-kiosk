import React, { useCallback } from 'react';
import mIcon1 from '../../assets/icons/menu_icon.jpg';

type Props = {
  onClose: () => void;
};

export default function OrderFloatButton({ onClose }: Props) {
  const handlePress = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      className={[
        'fixed z-50', // above iframe
        'bottom-[120px] right-[50px]',
        'pointer-events-none', // wrapper ignores events
      ].join(' ')}
    >
      <button
        type="button"
        // Pointer-first: fires for touch & mouse; very snappy on mobile
        onPointerUp={handlePress}
        // Fallback for older browsers
        onClick={handlePress}
        aria-label="Close / Go back"
        className={[
          'relative inline-flex items-center justify-center',
          'h-28 w-28',
          'rounded-full shadow-lg bg-[#1961FF]',
          'transition transform active:scale-95',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#658DF5]',
          'select-none touch-manipulation', // remove 300ms delay
          'pointer-events-auto', // button receives events
        ].join(' ')}
        // Remove iOS blue tap highlight
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePress();
          }
        }}
      >
        {/* Glow / ping layers */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[#1B66FF]/10" />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-[#1B66FF]/30" />

        {/* Icon */}
        <img
          src={mIcon1.src}
          alt=""
          className="relative h-[70px] w-[70px] rounded-full select-none"
          draggable={false}
        />
      </button>
    </div>
  );
}
