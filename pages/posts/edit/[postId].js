import { useEffect, useState } from "react";
import { useSession } from "../../../utils/hooks/useSession";
import { useRouter } from "next/router";

export default function EditPost({ post: oldPost }) {
  const router = useRouter();
  const { isAuth, token } = useSession();
  const { postId } = router.query;
  useEffect(() => {
    document.title = "Edit Post";
    if (!isAuth) router.push("/auth/signin");
  });

  const [fields, setFields] = useState(oldPost.data);

  async function submitHandler(e) {
    e.preventDefault();
    const editPost = await fetch(`/api/posts/update/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });
    if (editPost.ok) {
      router.push("/");
    }
  }

  function fieldsHandler(e) {
    const fieldName = e.target.getAttribute("name");
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <form
        onSubmit={submitHandler}
        className="bg-primary rounded-lg p-7 w-11/12 lg:w-1/3 shadow-neumorph pb-16"
      >
        <h1 className="text-2xl underline text-center mb-5 font-semibold text-gray-700">
          Edit Post
        </h1>
        <div className="space-y-3 text-gray-700">
          <input
            value={fields.title}
            className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
            type="text"
            name="title"
            placeholder="Title"
            onChange={fieldsHandler}
            required
          />{" "}
          <textarea
            value={fields.body}
            className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-lg text-sm h-48"
            name="body"
            placeholder="Body"
            onChange={fieldsHandler}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="inline-block bg-pink-500 hover:bg-pink-700 px-10 shadow-xl py-1.5 rounded-full text-white text-sm mt-7"
          onClick={submitHandler}
        >
          Go!
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { postId } = ctx.query;
  console.log(postId);
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
