import Router from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useSession } from "../utils/hooks/useSession";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Dashboard() {
  const { isAuth, token } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Dashboard";
    if (!isAuth) {
      Router.push("/auth/signin");
    }

    jwt.verify(token, "Aku Sayang Ibu", (err, decoded) => {
      setUser(decoded);
    });
  }, []);

  function logoutHandler() {
    Cookies.remove("token");
    Router.push("/");
  }

  return (
    <>
      <h1 className="text-3xl">Welcome {user?.data.fullname}</h1>
      <h1>This is Dashboard page Bitch!!!</h1>
      <div className="space-x-3">
        <Link href="/">
          <a className="underline">Home Page</a>
        </Link>
        <Link href="/posts/create">
          <a className="underline">Create Post</a>
        </Link>
      </div>
      <button
        className="px-5 py-2 bg-pink-50 text-pink-700 hover:bg-pink-200 hover:text-pink-900"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
}
