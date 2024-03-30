/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'v3ndqtum6cv80yw6.public.blob.vercel-storage.com',
            port: '',
          },
        ],
    },
};

export default nextConfig;
