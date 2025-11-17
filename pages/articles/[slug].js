import Layout from "../../components/Layout";
import { getPostBySlug, getAllPosts } from "../../lib/posts";

export default function ArticlePage({ post }) {
  if (!post) return <Layout><div className="p-10">Not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.date} — {post.category}
        </p>
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

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post: post || null,
    },
  };
}
