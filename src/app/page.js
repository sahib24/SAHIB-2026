"use client";
import { useState, useEffect } from "react";
import axios from "@/plugins/axios";

export default function PostCRUDInlineUpdate() {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  const [posts, setPosts] = useState([]);
  const [apiPosts, setApiPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const [showPosts, setShowPosts] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/posts", formData);

      const newPost = {
        ...res.data,
        id: Date.now(),
        type: "local",
      };

      setPosts((prev) => [newPost, ...prev]);
      setFormData({ userId: "", title: "", body: "" });
      setShowCreateForm(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setApiLoading(true);
    try {
      const res = await axios.get("/posts");

      const data = res.data.slice(0, 10).map((p) => ({
        ...p,
        type: "api",
      }));

      setApiPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setApiLoading(false);
    }
  };

  const handleCardClick = async (post) => {
    setSelectedPost(post);
    setShowModal(true);
    setIsEditing(false);
    setCommentLoading(true);
    try {
      const res = await axios.get(`/posts/${post.id}/comments`);

      setComments(res.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedPost.type === "api") {
        await axios.patch(`/posts/${selectedPost.id}`, selectedPost);

        setApiPosts((prev) =>
          prev.map((p) => (p.id === selectedPost.id ? selectedPost : p)),
        );
      } else {
        setPosts((prev) =>
          prev.map((p) => (p.id === selectedPost.id ? selectedPost : p)),
        );
      }

      setShowModal(false);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedPost.type === "api") {
        await axios.delete(`/posts/${selectedPost.id}`);

        setApiPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
      }

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      name: "You",
      body: commentInput,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-10">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Create
        </button>
      </div>

      {showCreateForm && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md bg-white p-6 rounded-xl shadow-md mb-6"
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

          <button className="w-full bg-green-500 text-white p-3 rounded">
            {loading ? "Processing..." : "Create Post"}
          </button>
        </form>
      )}

      {showPosts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apiLoading ? (
            <p>Loading posts...</p>
          ) : (
            apiPosts.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="cursor-pointer bg-white p-5 rounded-2xl shadow space-y-1"
              >
                <p>User ID: {item.userId}</p>
                <h2>
                  <span className="font-semibold">Name: </span>
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Comment: </span>
                  {item.body}
                </p>
              </div>
            ))
          )}

          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleCardClick(post)}
              className="cursor-pointer bg-white p-5 rounded-2xl shadow space-y-1"
            >
              <p>User ID: {post.userId}</p>
              <h2>
                <span className="font-semibold">Name: </span>
                {post.title}
              </h2>
              <p>
                <span className="font-semibold">Comment: </span>
                {post.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-gray-200 p-6 rounded-xl w-125">
            <h2 className="text-xl font-bold mb-4 text-center">Details</h2>

            {!isEditing ? (
              <div>
                <p>
                  <strong>User ID:</strong> {selectedPost.userId}
                </p>
                <p>
                  <strong>Title:</strong> {selectedPost.title}
                </p>
                <p>
                  <strong>Body:</strong> {selectedPost.body}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  value={selectedPost.userId}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, userId: e.target.value })
                  }
                  className="w-full p-2 border mb-2 bg-white"
                />
                <input
                  value={selectedPost.title}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, title: e.target.value })
                  }
                  className="w-full p-2 border mb-2 bg-white"
                />
                <textarea
                  value={selectedPost.body}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, body: e.target.value })
                  }
                  className="w-full p-2 border mb-2 bg-white"
                />

                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
              </div>
            )}

            <h3 className="font-semibold mb-2 mt-4">Comments</h3>

            <div className="flex flex-col gap-2 mb-4">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="border p-2 rounded bg-white"
                placeholder="Write comment..."
              />
              <button
                onClick={handleAddComment}
                className="bg-green-500 text-white px-3 py-2 rounded w-fit"
              >
                Post
              </button>
            </div>

            {commentLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white p-2 rounded">
                    <p>
                      <strong>Name:</strong> {c.name}
                    </p>
                    <p>
                      <strong>Comment:</strong> {c.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              className="mt-3 text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
