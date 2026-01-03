import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '위빙(Weaving)',
    short_name: '위빙',
    description: '우리의 세계가 만나는 곳',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#97E6AB',
    icons: [
      {
        src: './favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}