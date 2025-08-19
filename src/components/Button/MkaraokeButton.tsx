import React, { useEffect, useCallback, useState } from 'react';
import MKaraokeModal from '../Modal/MkaraokeModal';
import mIcon1 from '../../assets/icons/mmusic2.png';

export default function MkaraokeButton() {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  // Body scroll lock when modal is visible
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (visible) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  // Close on ESC
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, close]);

  return (
    <>
      <div className={['fixed z-10', 'bottom-[220px] right-[50px]'].join(' ')}>
        <button
          type="button"
          onClick={open}
          aria-label="Open MKaraoke"
          className={[
            'relative inline-flex items-center justify-center',
            // Size
            'h-28 w-28 ',
            // Visuals
            'rounded-full shadow-lg bg-[#1961FF]',
            'transition transform active:scale-95',
          ].join(' ')}
        >
          {/* Glow / ping layers (click-д саад болохгүй) */}
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[#1B66FF]/10" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-[#1B66FF]/30"
          />

          {/* Icon */}
          <img
            src={mIcon1.src}
            alt=""
            className="relative h-[70px] w-[70px]  rounded-full select-none"
            draggable={false}
          />
        </button>
      </div>

      <MKaraokeModal visible={visible} onClose={close} />
    </>
  );
}
