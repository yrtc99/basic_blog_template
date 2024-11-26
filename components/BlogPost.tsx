// components/BlogPost.js
import parse from 'html-react-parser';

export default function BlogPost({ content }) {
  return (
    <article className="prose max-w-none">
      {parse(content)}
    </article>
  );
}
