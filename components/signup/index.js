import { useState } from "react";

export default function Forms() {
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(null);
  const [statusCode, setStatusCode] = useState(0);

  function fieldHandler(e) {
    const fieldName = e.target.getAttribute("name");
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setStatus("Loading");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();
    setStatus(data.message);
    setStatusCode(data.code);
    console.log(fields);
    setFields({
      fullName: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <div className="flex flex-col-reverse items-center justify-center min-h-screen bg-primary">
        <span
          className={`${
            status && "mt-10 px-10 p-3 text-white rounded-lg shadow-lg"
          } 
          ${statusCode == 200 ? "bg-green-500" : "bg-red-500"}`}
        >
          {status}
        </span>
        <form
          onSubmit={submitHandler}
          className="bg-primary rounded-lg p-7 w-11/12 lg:w-1/3 shadow-neumorph pb-16"
        >
          <h1 className="text-2xl underline text-center mb-5 font-semibold text-gray-700">
            Sign Up
          </h1>
          <div className="space-y-3">
            <input
              value={fields.fullName}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="text"
              name="fullName"
              placeholder="Fullname"
              required
              onChange={fieldHandler}
            />{" "}
            <input
              value={fields.email}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={fieldHandler}
            />{" "}
            <input
              value={fields.password}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="password"
              name="password"
              placeholder="Password"
              required
              min={8}
              onChange={fieldHandler}
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
      </div>
    </>
  );
}
