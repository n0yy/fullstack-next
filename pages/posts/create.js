import { useEffect, useState } from "react";
import { useSession } from "../../utils/hooks/useSession";
import Router from "next/router";
import Link from "next/link";

export default function CreatePost() {
  const { isAuth, token } = useSession();
  const [fields, setFields] = useState({
    title: "",
    body: "",
  });

  function fieldsHandler(e) {
    const fieldName = e.target.getAttribute("name");
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const createPost = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (createPost.ok) {
      Router.push("/");
    }
  }

  useEffect(() => {
    document.title = "Create Post";
    if (!isAuth) Router.push("/auth/signin");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-2 lg:px-0">
      <form
        onSubmit={submitHandler}
        className="bg-primary rounded-lg p-7 w-11/12 lg:w-1/3 shadow-neumorph pb-16"
      >
        <h1 className="text-2xl underline text-center mb-5 font-semibold text-gray-700">
          Create Post
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
      <span className="text-sm underline text-gray-500 mt-5">
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </span>
    </div>
  );
}
