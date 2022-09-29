import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from './styles/utils.module.css'
import Link from 'next/link'
import Date from './date'
import { GetStaticProps } from 'next'
import {getPosts, dateAsString, markdownAsHtml} from '../src/blog'
import { readAll } from '../db/files'

export default function Home({
  posts
}: {
  posts: {
    id: string, title: string, posted: string, text: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        Hello, world
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, posted, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={posted} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    posts: await Promise.all(getPosts(readAll()).map(async p => ({ ...p, posted: dateAsString(p.posted), text: await markdownAsHtml(p.text) })))
  }
})
