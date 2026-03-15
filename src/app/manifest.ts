import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aletheia | Intelligence Platform',
    short_name: 'Aletheia',
    description: 'Advanced AI-powered intelligence orchestration and automated threat investigation platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Developers can add higher-res 192x192 and 512x512 icons here later for a perfect mobile install
    ],
  }
}
