// Set by the GitHub Pages workflow: build a static site served from /<repo-name>.
const pagesBasePath = process.env.PAGES_BASE_PATH

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: pagesBasePath ?? '',
  },
  ...(pagesBasePath !== undefined && {
    output: 'export',
    basePath: pagesBasePath,
    trailingSlash: true,
  }),
}

export default nextConfig
