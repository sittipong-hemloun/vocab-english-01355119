import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Reading',
    short_name: 'Reading',
    description: 'Reading',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}