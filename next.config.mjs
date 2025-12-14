import createNextIntlPlugin from 'next-intl/plugin';

// Point to i18n config inside src/
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
};

export default withNextIntl(nextConfig);
