'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';

type WifiInfo = { wifi_name: string; wifi_password: string };

type WifiModalProps = {
  open: boolean;
  onClose: () => void;
};

function escapeWifiText(value: string) {
  // Escape per Wi-Fi QR spec for special characters
  return value.replace(/([\\;"',:])/g, '\\$1');
}

function buildWifiQRPayload(info: WifiInfo | null) {
  if (!info) return '';
  const S = escapeWifiText(info.wifi_name || '');
  const P = escapeWifiText(info.wifi_password || '');
  const isOpen = !info.wifi_password;
  const T = isOpen ? 'nopass' : 'WPA';
  // H:false means SSID is visible (not hidden)
  return `WIFI:T:${T};S:${S};${isOpen ? '' : `P:${P};`}H:false;`;
}

export default function WifiModal({ open, onClose }: WifiModalProps) {
  const [wifi, setWifi] = useState<WifiInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch when opened
  useEffect(() => {
    if (!open) return;

    const fetchWifi = async () => {
      setLoading(true);
      setError(null);
      setWifi(null);
      try {
        const paramUrl = localStorage.getItem('paramUrl') || '';
        // paramUrl should already look like "?univision_id=...&mac_address=...&serial_number=..."
        const url = `https://staging.mkaraoke.mn/org/qmenu/wifi?${paramUrl}`;

        const res = await axios.get<WifiInfo>(url, {
          headers: {
            'api-key': 'TSSD5FJ223DJ5J4ZP2XT9SRZRDP9XZSR.X6QEC7',
          },
        });

        if (!res.data?.wifi_name) {
          throw new Error('Unexpected response');
        }
        setWifi(res.data);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch Wi-Fi info');
      } finally {
        setLoading(false);
      }
    };

    fetchWifi();
  }, [open]);

  // Generate QR to canvas whenever data changes
  const qrPayload = useMemo(() => buildWifiQRPayload(wifi), [wifi]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !qrPayload) return;

    // Render QR to canvas
    QRCode.toCanvas(canvas, qrPayload, { width: 180, margin: 1 }, (err) => {
      if (err) {
        console.error(err);
        setError('Failed to render QR');
      }
    });
  }, [qrPayload]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="text-lg font-semibold">Wi-Fi</h3>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {loading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          {!loading && !error && wifi && (
            <div className="space-y-5">
              {/* QR */}
              <div className="flex justify-center">
                <div className="rounded-xl border p-4">
                  <canvas ref={canvasRef} />
                </div>
              </div>

              {/* SSID */}
              <div>
                <label className="block text-xs text-gray-500">Wi-Fi</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border bg-gray-50 px-3 py-2">
                  <div className="truncate font-medium">{wifi.wifi_name}</div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-gray-500">Нууц үг</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border bg-gray-50 px-3 py-2">
                  <div className="truncate font-medium">{wifi.wifi_password}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Зөвлөмж: Шууд холбогдохын тулд утасныхаа камерыг нээж, QR-г уншина уу.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-5 py-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
}
