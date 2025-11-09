import MillionLint from "@million/lint";
import { withSentryConfig } from "@sentry/nextjs";

import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  productionBrowserSourceMaps: process.env.NODE_ENV === "production",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      // change the domains into remotePatterns
      {
        hostname: "abs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "pbs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "*.supabase.co",
        protocol: "https",
      },
      {
        hostname: "*.oraclecloud.com",
        protocol: "https",
        pathname: "**/images/**",
      },
      {
        hostname: "*.customer-oci.com",
        protocol: "https",
        pathname: "**/images/**",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
    ],
  },
  // Content Security Policy header for third-party analytics/ads
  // This builds the header from directives for readability and easier maintenance.
  async headers() {
    const directives = {
      "default-src": ["'self'", "https://*.weavv.in", "https://*.google.com"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://*.googlesyndication.com",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://www.googletagservices.com",
        "https://*.google.com",
        "https://static.cloudflareinsights.com",
        "https://*.ingest.us.sentry.io",
        "https://*.adtrafficquality.google",
        "https://*.weavv.in",
        "https://*.g.doubleclick.net",
        "https://*.kakaocdn.net",
        "https://sharer.kakao.com/picker/link",
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://*.weavv.in",
        "https://*.adtrafficquality.google",
        "https://*.googlesyndication.com",
        process.env.NEXT_PUBLIC_SUPABASE_URL,
      ],
      "img-src": [
        "'self'",
        "data:",
        "blob:",
        "https://*.googlesyndication.com",
        "https://www.google-analytics.com",
        "https://*.weavv.in",
        "https://*.oraclecloud.com",
        "https://*.twimg.com",
        "https://*.adtrafficquality.google",
        "https://googleads.g.doubleclick.net",
        "https://*.google.com",
        "https://www.googletagmanager.com",
        process.env.NEXT_PUBLIC_SUPABASE_URL,
      ],
      "connect-src": [
        "'self'",
        "ws:",
        "https://www.google-analytics.com",
        "https://*.googlesyndication.com",
        "https://www.googletagmanager.com",
        "https://*.ingest.us.sentry.io",
        "https://*.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        "https://*.weavv.in",
        "https://*.google.com",
        "https://*.g.doubleclick.net",
        "https://*.kakaocdn.net",
        "https://sharer.kakao.com/picker/link",
        "https://*.kakao.com",
        process.env.NEXT_PUBLIC_SUPABASE_URL,
      ],
      "frame-src": [
        "https://*.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://www.googletagmanager.com",
        "https://www.googletagservices.com",
        "https://*.adtrafficquality.google",
        "https://*.weavv.in",
        "https://www.google.com",
        "https://*.google.com",
        process.env.NEXT_PUBLIC_BASE_URL,
      ],
      "font-src": [
        "https://fonts.gstatic.com",
        "https://*.weavv.in",
        process.env.NEXT_PUBLIC_BASE_URL,
      ],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'", "https://*.kakao.com"],
    };

    const buildCsp = (map) =>
      Object.entries(map)
        .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
        .join("; ") + ";";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildCsp(directives),
          },
        ],
      },
    ];
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // Ensure MDX works with server components by not using @mdx-js/react
    providerImportSource: undefined,
    jsx: true,
  },
});

export default MillionLint.next({
  enabled: false,
  rsc: true,
})(
  withSentryConfig(withMDX(nextConfig), {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "finding-benjamin",
    project: "weaving",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    beforeSend(event, hint) {
      const error = hint.originalException;
      if (
        error &&
        typeof error.message === "string" &&
        error.message.includes("adsbygoogle.push() error")
      ) {
        return null; // Sentry 전송 안 함
      }
      return event;
    },

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  })
);
