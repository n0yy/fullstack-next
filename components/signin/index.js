import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

export default function FormsSignIn() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  function fieldHandler(e) {
    const fieldName = e.target.getAttribute("name");
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const { message, token } = await res.json();
    // Set Cookie
    Cookies.set("token", token, {
      expires: 7,
    });
    setMessage(message);
    if (res.ok) Router.push("/");
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <form
          onSubmit={submitHandler}
          className="bg-primary rounded-lg p-7 w-11/12 lg:w-1/3 shadow-neumorph pb-16"
        >
          <h1 className="text-2xl underline text-center mb-5 font-semibold text-gray-700">
            Sign In
          </h1>
          {message && (
            <span className="inline-block p-3 bg-red-200 w-full mb-4 rounded text-red-600">
              {message}
            </span>
          )}
          <div className="space-y-3">
            <input
              value={fields.email}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="email"
              name="email"
              placeholder="Email"
              onChange={fieldHandler}
              required
            />{" "}
            <input
              value={fields.password}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="password"
              name="password"
              placeholder="Password"
              min={8}
              onChange={fieldHandler}
              required
            />{" "}
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
    </>
  );
}
