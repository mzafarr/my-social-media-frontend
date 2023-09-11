import Link from "next/link";
import { useCookies } from "react-cookie";
import { MdSecurity } from "react-icons/md";
import { useRouter } from "next/navigation";
import Posts from "../Posts/page";

const Navbar = ({ isSignedIn, setIsSignedIn }: any) => {
  const router = useRouter();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    setIsSignedIn(false);
    router.push("/");
  };

  return (
    <nav className="absolute top-0 flex items-center border-b justify-center text-lg sm:text-xl py-4 w-full text-white">
      <div className="flex ml-4 sm:ml-10 sm:gap-5 items-center space-x-4 font-semibold">
        <Link
          className="cursor-pointer text-white hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
        <Link
          className="hidden sm:block cursor-pointer text-white hover:text-gray-300"
          href="/"
        ></Link>
        {!cookies.access_token ? (
          <>
            <Link
              className="cursor-pointer text-white hover:text-gray-300"
              href="/SignIn"
            >
              Sign In
            </Link>
            <Link
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              href="/SignUp"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              className="cursor-pointer text-white hover:text-gray-300"
              href="/Posts"
            >
              My Posts
            </Link>
            <button
              onClick={logout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
