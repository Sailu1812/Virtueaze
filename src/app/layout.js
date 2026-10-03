import './globals.css';

export const metadata = {
  title: 'Scroll Background Video',
  description: 'Smooth scroll-driven background video experience built with Next.js',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

