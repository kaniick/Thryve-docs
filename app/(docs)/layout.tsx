import { BASE_PATH } from '../../site.config.mjs'
import { BrandLogo } from '../../components/BrandLogo'
import { LinkArrow } from '../../components/LinkArrow'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout
      navbar={
        <Navbar
          logo={
            <span className="wordmark">
              <BrandLogo />
              <span className="docs-label">/ docs</span>
            </span>
          }
          projectLink="https://github.com/kaniick"
        />
      }
      footer={
        <Footer>
          <span>
            Thryve · Your garden, your rules.{' '}
            <a href={BASE_PATH + '/'}>
              Back to home <LinkArrow />
            </a>
            {' · '}
            <a href="https://sleepypod.github.io/">
              Sibling project: sleepypod <LinkArrow direction="external" />
            </a>
          </span>
        </Footer>
      }
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/kaniick/Thryve-docs/tree/main"
      feedback={{
        content: 'Found an issue?',
        link: 'https://github.com/kaniick/Thryve-docs/issues',
      }}
      nextThemes={{ defaultTheme: 'dark' }}
    >
      {children}
    </Layout>
  )
}
