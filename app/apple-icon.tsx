import { ImageResponse } from 'next/og';

// Home-screen icon for iOS (needs PNG). Same mark as app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#0f0f0e" />
        <path d="M20.2 10.3 A8 8 0 1 0 20.2 21.7" fill="none" stroke="#efede9" strokeWidth="4" />
        <rect x="22" y="19" width="5" height="5" fill="#d42a2a" />
      </svg>
    ),
    size,
  );
}
