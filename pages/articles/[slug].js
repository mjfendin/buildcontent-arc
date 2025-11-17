import Layout from "../../components/Layout";
import { getPostBySlug, getAllPosts } from "../../lib/posts";

export default function ArticlePage({ post }) {
  if (!post) return <Layout><div className="py-10">Artikel tidak ditemukan.</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date} • {post.category}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}
