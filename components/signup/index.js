import { useState } from "react";

export default function Forms() {
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

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
    console.log(data);
    setStatus(data.message);
  }

  return (
    <>
      <h3>{status}</h3>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="fullName"
          placeholder="Fullname"
          required
          onChange={fieldHandler}
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={fieldHandler}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          min={8}
          onChange={fieldHandler}
        />{" "}
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
