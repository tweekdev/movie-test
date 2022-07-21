/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['image.tmdb.org', 'tmdb.org', 'themoviedb.org'],
    },
};

module.exports = nextConfig;
