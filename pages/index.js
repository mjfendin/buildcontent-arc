import Layout from "../components/Layout";
import { getAllPosts } from "../lib/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">My Content App</h1>

        {!posts.length && <p>No content yet.</p>}

        <div className="space-y-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/articles/${post.slug}`}
              className="block border rounded-lg p-4 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts: posts || [],
    },
  };
}
