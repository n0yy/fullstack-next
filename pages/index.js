import { useSession } from "../utils/hooks/useSession";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home({ posts: data }) {
  const { isAuth, token } = useSession();
  const [posts, setPosts] = useState(data);

  async function deleteHandler(postId) {
    const ask = confirm("Yakin mao dihapus Bos ?? ");
    if (ask) {
      const deletePost = await fetch("/api/posts/delete/" + postId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const { freshData } = await deletePost.json();
      setPosts(freshData);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mt-10 flex justify-center flex-wrap gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-7 bg-indigo-50 w-3/12 rounded-lg shadow-lg shadow-indigo-200"
          >
            <h3 className="text-2xl font-semibold text-gray-700 leading-6 mb-2 tracking-wide text-justify">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm mb-5 text-justify">
              {post.body.length > 100
                ? `${post.body.substring(0, 100)}...`
                : post.body}
            </p>
            <span className="block text-xs text-gray-300">
              {post.created_at}
            </span>
            {isAuth && (
              <div className="mt-3 space-x-3">
                <button
                  className="bg-red-700 px-3 text-xs py-1 text-white/70 rounded"
                  onClick={() => deleteHandler(post.id)}
                >
                  Delete
                </button>
                <Link href={`/posts/edit/${post.id}`}>
                  <a className="bg-orange-500 px-3 text-xs py-1 text-white/70 rounded">
                    Edit
                  </a>
                </Link>
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}
