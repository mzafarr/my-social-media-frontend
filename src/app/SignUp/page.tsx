"use client";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../Toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSignUp = async (event: any) => {
    event.preventDefault();

    if (
      username.trim() === "" ||
      name.trim() === "" ||
      password.trim() === ""
    ) {
      errorToast("One or more empty fields.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/User/signup`,
        {
          name,
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      successToast("Registration Completed! Now login.");
      router.push("/SignIn");
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-4 py-16 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-16 mt-4">Sign Up</h1>
        <div className="max-w-xs mx-auto">
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:outline-none text-slate-800 w-full mb-6 px-4 py-3 rounded"
          />
          <input
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:outline-none text-slate-800 w-full mb-6 px-4 py-3 rounded"
          />
          <input
            required
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="focus:outline-none text-slate-800 w-full mb-6 px-4 py-3 rounded"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:outline-none text-slate-800 w-full mb-6 px-4 py-3 rounded"
          />
          <button
            type="submit"
            onClick={handleSignUp}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
          >
            Sign Up
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
