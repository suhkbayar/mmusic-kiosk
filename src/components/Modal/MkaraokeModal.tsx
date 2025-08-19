import { useState, useMemo, useRef, useEffect } from 'react';
import OrderFloatButton from '../Button/orderFloatButton';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MKaraokeModal = ({ visible, onClose }: Props) => {
  // Read paramUrl safely on the client (avoids SSR issues) and when modal opens
  const [paramUrl, setParamUrl] = useState<string>('');
  const [paramsLoaded, setParamsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const v = localStorage.getItem('paramUrl') || '';
      setParamUrl(v);
      setParamsLoaded(true);
    }
  }, [visible]);

  const iframeSrc = useMemo(() => {
    const q = (paramUrl || '').replace(/^\?+/, '');
    const base = 'https://remote.mkaraoke.mn/';
    return q ? `${base}?${q}` : base;
  }, [paramUrl]);

  // iframe ref + remount key for reliable reload
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameKey, setFrameKey] = useState(0);

  // Remount iframe when becoming visible or when src changes to ensure a clean load
  useEffect(() => {
    if (visible) {
      setFrameKey((k) => k + 1);
    }
  }, [visible, iframeSrc]);

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="true" className={['fixed inset-0 z-30', 'flex flex-col', 'bg-white'].join(' ')}>
      <div className="flex-1 min-h-0 relative">
        {paramsLoaded && iframeSrc.includes('?') ? (
          <iframe
            key={`${iframeSrc}-${frameKey}`} // remount on reload
            ref={iframeRef}
            src={iframeSrc}
            title="MKaraoke Remote"
            className="w-full h-full border-0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen; web-share"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-transparent rounded-full"
              aria-label="Loading"
            />
          </div>
        )}
      </div>

      <OrderFloatButton onClose={onClose} />
    </div>
  );
};

export default MKaraokeModal;
