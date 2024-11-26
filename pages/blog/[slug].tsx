// pages/blog/[slug].js

import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout'
import BlogPost from '../../components/blogpost'

export default function Post({ content, title }) {
  return (
    <Layout>
      <h1 className="text-3xl mb-4">{title}</h1>
      <BlogPost content={content} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'public', 'blog-posts')
  const filenames = fs.readdirSync(postsDirectory)

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.html', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'public', 'blog-posts')
  const filePath = path.join(postsDirectory, `${params.slug}.html`)
  const content = fs.readFileSync(filePath, 'utf8')

  // 提取標題
  const titleMatch = content.match(/<title>(.*?)<\/title>/)
  const title = titleMatch ? titleMatch[1] : params.slug

  return {
    props: {
      content,
      title,
    },
  }
}
