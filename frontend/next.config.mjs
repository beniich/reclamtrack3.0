import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL
  },

  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true
    };

    // Paper.js uses a Node.js canvas build that requires jsdom
    // which is not available in the Vercel build. We alias paper to
    // the browser-only build to prevent the Node canvas module from loading.
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Force browser build of paper
        'paper': require.resolve('paper/dist/paper-full.js'),
      };
    }

    // Exclude the problematic Node canvas module from all builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      jsdom: false,
    };

    return config;
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  transpilePackages: ['lucide-react', 'recharts'],

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'placeholder.pics'],
  },
  async rewrites() {
    return [
      {
        source: '/debug/:path*',
        destination: 'http://localhost:8000/debug/:path*',
      },
      {
        source: '/analytics/:path*',
        destination: 'http://localhost:8000/analytics/:path*',
      },
      {
        source: '/error',
        destination: 'http://localhost:8000/error',
      },
      {
        source: '/ping',
        destination: 'http://localhost:8000/ping',
      },
    ]
  },
};

export default withNextIntl(nextConfig);
