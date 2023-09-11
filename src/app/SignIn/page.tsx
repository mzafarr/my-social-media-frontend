"use client";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast } from "../Toast";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      errorToast("One or more empty fields.");
      return;
    }
    try {
      const result = await axios.post(
        `http://localhost:3000/User/signin`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("username", result.data.username);
      successToast("Successfully signed in.");
      router.push("/Posts");
    } catch (error) {
      console.error(error);
      errorToast("Username or password is wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-4 py-16 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-16 mt-4">Sign In</h1>
        <div className="max-w-xs mx-auto">
          <form>
            <input
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:outline-none text-slate-800   w-full mb-6 px-6 py-3 rounded"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none text-slate-800   w-full mb-6 px-6 py-3 rounded"
            />
            <button
              type="submit"
              onClick={handleSignIn}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
