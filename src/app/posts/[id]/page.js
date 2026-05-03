import Link from "next/link";

export default async function Page({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );
  const post = await res.json();

  return (
    <div className="p-6">
      <p>fwfawgagaerhae</p>
      <Link
        href="/posts"
        className="inline-block mt-6 text-red-500 hover:underline"
      >
        ← Back to Posts
      </Link>
    </div>
  );
}
