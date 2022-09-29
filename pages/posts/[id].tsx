import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../date'
import utilStyles from '../styles/utils.module.css'
import {dateAsString, getPost, getPosts, markdownAsHtml} from '../../src/blog'
import { GetStaticProps, GetStaticPaths } from 'next'
import { readAll } from '../../db/files'

export default function Post({
  post
}: {
  post: {
    id: string, title: string, posted: string, text: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.posted} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.text }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getPosts(readAll()).map(p => ({ params: { id: p.id } })),
  fallback: false
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPost(params.id as string, readAll())
  return {
    props: {
      post: ({...post, posted: dateAsString(post.posted), text: await markdownAsHtml(post.text)})
    }
  }
}
