// pages/index.js
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className="text-4xl mb-4">歡迎來到我的博客</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'public', 'blog-posts');
  
  // 檢查目錄是否存在
  if (!fs.existsSync(postsDirectory)) {
    console.error(`目錄不存在: ${postsDirectory}`);
    return {
      props: {
        posts: [],
      },
    };
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : filename.replace('.html', '');
    const slug = filename.replace('.html', '');

    return {
      title,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
