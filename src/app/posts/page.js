import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 12).map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition duration-300 border hover:border-blue-400"
          >
            <h2 className="font-semibold text-lg mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-3">{post.body}</p>

            <span className="text-blue-500 text-sm mt-3 inline-block">
              Read More →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
