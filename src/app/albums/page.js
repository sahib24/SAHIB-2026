async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();
  return data;
}

export default async function Page() {
  const posts = await getData();

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8 mt-10">
        All albums API Data
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-2xl hover:shadow-xl transition duration-300"
          >
            <p className="text-sm text-gray-500 mb-2">User ID: {post.userId}</p>

            <p className="text-sm text-gray-500 mb-2">ID: {post.id}</p>

            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
