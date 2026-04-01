async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

export default async function Page() {
  const users = await getData();

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8 mt-10">
        All USERS API DATA
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              Username: {user.username}
            </p>
            <p className="text-sm text-gray-500 mb-1">Email: {user.email}</p>
            <p className="text-sm text-gray-500 mb-1">Phone: {user.phone}</p>
            <p className="text-sm text-gray-500 mb-2">
              Website: {user.website}
            </p>

            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Address:</h3>
              <p className="text-xs text-gray-500">
                {user.address.street},<br />
                {user.address.suite},<br />
                {user.address.city},<br />
                {user.address.zipcode},<br />
                {user.address.geo.lat},<br />
                {user.address.geo.lng}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700">Company:</h3>
              <p className="text-xs text-gray-500">
                {user.company.name}
                <br />
                {user.company.catchPhrase}
                <br />
                {user.company.bs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
