import Link from "next/link";
import { useSession } from "../utils/hooks/useSession";
import Router from "next/router";
import Cookies from "js-cookie";

export default function Navbar() {
  const { isAuth } = useSession();

  function logoutHandler() {
    const ask = confirm("Really to Logout?");
    if (ask) {
      Cookies.remove("token");
      Router.push("/");
    }
  }

  return (
    <nav className="px-10 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl">FullStack NextJS</h1>
      </div>
      <div className="text-sm space-x-5">
        <Link href="/">
          <a className="text-gray-500 hover:text-gray-900 hover:underline">
            Home
          </a>
        </Link>
        <Link href="/posts/create">
          <a className="text-gray-500 hover:text-gray-900 hover:underline">
            Create Post
          </a>
        </Link>
      </div>
      <div className="space-x-3">
        {isAuth ? (
          <button
            onClick={logoutHandler}
            className="px-5 py-1.5 bg-red-100 text-red-600 rounded text-sm shadow"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/auth/signup">
              <a className="px-5 py-2 shadow rounded text-white bg-gray-300 text-sm">
                Sign Up
              </a>
            </Link>
            <Link href="/auth/signin">
              <a className="px-5 py-2 shadow rounded text-white bg-indigo-500 text-sm">
                Sign In
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
