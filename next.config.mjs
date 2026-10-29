// Set by the GitHub Pages workflow: build a static site served from /<repo-name>.
const pagesBasePath = process.env.PAGES_BASE_PATH
const isPages = pagesBasePath !== undefined

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
  ...(isPages
    ? {
        output: 'export',
        basePath: pagesBasePath,
        trailingSlash: true,
      }
    : {
        // The Media admin panel and its API need a server, so they only exist outside the static export:
        // files named page.vercel.tsx / route.vercel.ts are routes on Vercel and ignored by the Pages build.
        pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'vercel.tsx', 'vercel.ts'],
        async redirects() {
          return [{ source: '/news', destination: '/media', permanent: true }]
        },
      }),
}

export default nextConfig
