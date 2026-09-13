/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async rewrites() {
    return [
      // County Pages
      { source: '/philadelphia-county-home-care', destination: '/areas-we-serve/philadelphia' },
      { source: '/bucks-county-home-care', destination: '/areas-we-serve/bucks' },
      { source: '/montgomery-county-home-care', destination: '/areas-we-serve/montgomery' },
      { source: '/delaware-county-home-care', destination: '/areas-we-serve/delaware' },
      { source: '/chester-county-home-care', destination: '/areas-we-serve/chester' },
      { source: '/lehigh-county-home-care', destination: '/areas-we-serve/lehigh' },
      { source: '/northampton-county-home-care', destination: '/areas-we-serve/northampton' },
      { source: '/berks-county-home-care', destination: '/areas-we-serve/berks' },
      { source: '/schuylkill-county-home-care', destination: '/areas-we-serve/schuylkill' },

      // City Pages
      { source: '/feasterville-pa-home-care', destination: '/areas-we-serve/bucks?city=feasterville' },
      { source: '/philadelphia-pa-home-care', destination: '/areas-we-serve/philadelphia?city=philadelphia' },
      { source: '/doylestown-pa-home-care', destination: '/areas-we-serve/bucks?city=doylestown' },
      { source: '/norristown-pa-home-care', destination: '/areas-we-serve/montgomery?city=norristown' },
      { source: '/media-pa-home-care', destination: '/areas-we-serve/delaware?city=media' },
      { source: '/west-chester-pa-home-care', destination: '/areas-we-serve/chester?city=westchester' },
      { source: '/reading-pa-home-care', destination: '/areas-we-serve/berks?city=reading' },
      { source: '/allentown-pa-home-care', destination: '/areas-we-serve/lehigh?city=allentown' },
      { source: '/bethlehem-pa-home-care', destination: '/areas-we-serve/northampton?city=bethlehem' },
      { source: '/pottsville-pa-home-care', destination: '/areas-we-serve/schuylkill?city=pottsville' },

      // Service Pages
      { source: '/companion-care', destination: '/services?service=companion-care' },
      { source: '/personal-care', destination: '/services?service=personal-care' },
      { source: '/24-hour-live-in-care', destination: '/services?service=24hour-care' },
      { source: '/dementia-alzheimers-care', destination: '/services?service=dementia-care' },
      { source: '/post-hospital-respite-care', destination: '/services?service=respite-care' },

      // Blog Pages
      { source: '/paid-family-caregiver-pennsylvania', destination: '/blog/paid-family-caregiver-pa' },
      { source: '/medicaid-home-care-pennsylvania', destination: '/blog/medicaid-waiver-programs-pa' },
      { source: '/home-care-cost-pennsylvania', destination: '/blog/home-care-cost-pennsylvania' },
      { source: '/home-care-vs-assisted-living', destination: '/blog/home-care-vs-assisted-living' },
      { source: '/find-caregiver-for-parent-pa', destination: '/blog/choosing-a-home-care-agency' },
    ];
  },
};

export default nextConfig;

