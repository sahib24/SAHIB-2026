"use client";
import { useState } from "react";
import axios from "@/plugins/axios";

export default function PostCRUDInlineUpdate() {
  const [formData, setFormData] = useState({ userId: "", title: "", body: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [apiPosts, setApiPosts] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const [showAlbumsModal, setShowAlbumsModal] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/posts", formData);
      const newPost = { ...res.data, id: Date.now(), editing: false };
      setPosts((prev) => [newPost, ...prev]);
      setFormData({ userId: "", title: "", body: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    await axios.delete(`/posts/${id}`).catch((err) => console.log(err));
  };

  const toggleEdit = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, editing: !post.editing } : post,
      ),
    );
  };

  const handleInlineChange = (id, e) => {
    const { name, value } = e.target;
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, [name]: value } : post)),
    );
  };

  const handleInlineUpdate = async (post) => {
    await axios
      .put(`/posts/${post.id}`, {
        userId: post.userId,
        title: post.title,
        body: post.body,
        id: post.id,
      })
      .catch((err) => console.log(err));

    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, editing: false } : p)),
    );
  };

  const PostsApi = async () => {
    setApiLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setApiPosts(res.data.slice(0, 10));
    } catch (err) {
      console.log(err);
    } finally {
      setApiLoading(false);
    }
  };

  const CommentsApi = () => {
    setCommentsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data.slice(0, 10)))
      .catch((err) => console.log(err))
      .finally(() => setCommentsLoading(false));
  };

  const AlbumsApi = () => {
    setAlbumsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((res) => setAlbums(res.data.slice(0, 10)))
      .catch((err) => console.log(err))
      .finally(() => setAlbumsLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Posts Form</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mb-6"
      >
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Post"}
        </button>

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
              PostsApi();
            }}
            className="px-6 py-2 border cursor-pointer text-white transition bg-violet-300"
          >
            Posts
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCommentsModal(true);
              CommentsApi();
            }}
            className="px-6 py-2 border cursor-pointer text-white transition bg-amber-300"
          >
            Comments
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAlbumsModal(true);
              AlbumsApi();
            }}
            className="px-6 py-2 border cursor-pointer text-white transition bg-amber-600"
          >
            Albums
          </button>
        </div>
      </form>

      <div className="max-w-md mx-auto grid gap-4">
        {posts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet</p>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            {post.editing ? (
              <div className="space-y-2">
                <input
                  type="number"
                  name="userId"
                  value={post.userId}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="body"
                  value={post.body}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleInlineUpdate(post)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => toggleEdit(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-1">
                  User ID: {post.userId}
                </p>
                <h2 className="font-semibold mb-2">{post.title}</h2>
                <p className="text-sm mb-3 line-clamp-3">{post.body}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => toggleEdit(post.id)}
                    className="text-white bg-blue-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-white bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto p-5 rounded-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Posts List</h2>
            {apiLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid gap-3">
                {apiPosts.map((item) => (
                  <div
                    key={item.id}
                    className="border p-3 rounded-lg bg-amber-200"
                  >
                    <p className="text-sm text-gray-500">User: {item.userId}</p>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showCommentsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto p-5 rounded-xl relative">
            <button
              onClick={() => setShowCommentsModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Comments List
            </h2>
            {commentsLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid gap-3">
                {comments.map((item) => (
                  <div
                    key={item.id}
                    className="border p-3 rounded-lg bg-purple-100"
                  >
                    <p className="text-sm text-gray-500">
                      Post ID: {item.postId}
                    </p>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-blue-500">{item.email}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showAlbumsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto p-5 rounded-xl relative">
            <button
              onClick={() => setShowAlbumsModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Albums List</h2>
            {albumsLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className=" p-5 rounded-2xl hover:shadow-xl transition duration-300 bg-blue-300"
                  >
                    <p className="text-sm text-white mb-2">
                      User ID: {album.userId}
                    </p>
                    <p className="text-sm text-white mb-2">ID: {album.id}</p>
                    <h2 className="text-lg font-semibold text-white">
                      {album.title}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
