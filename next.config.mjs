import { createRequire } from 'node:module'
import { dirname, join, relative } from 'node:path'
import nextra from 'nextra'
import { BASE_PATH } from './site.config.mjs'

const require = createRequire(import.meta.url)
const requireFromNextra = createRequire(require.resolve('nextra'))
const withNextra = nextra({})
export default withNextra({
  output: 'export',
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      // Nextra's bare node_modules path is treated as a package name by Turbopack.
      '@theguild/remark-mermaid/mermaid':
        './' +
        relative(
          process.cwd(),
          join(
            dirname(requireFromNextra.resolve('@theguild/remark-mermaid/package.json')),
            'dist/mermaid.js',
          ),
        ),
    },
  },
})
