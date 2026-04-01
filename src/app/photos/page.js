import Image from "next/image";
import Link from "next/link";

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  return data;
}

export default async function Page() {
  const posts = await getData();

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8 mt-10">
        All PHOTOS API DATA
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <Image
              src={post.thumbnailUrl} // Use thumbnail for faster loading
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <p className="text-xs text-gray-500">Album ID: {post.albumId}</p>
              <p className="text-xs text-gray-500 mb-2">ID: {post.id}</p>
              <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                {post.title}
              </h2>

              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 text-sm"
              >
                View Full Image
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
