import axios from "axios";
import React, { useState } from "react";

const CreatePost = ({ posts, setPosts }: any) => {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(1);
  const handleChange = (e: any) => {
    setText(e.target.value);
    const newRows = e.target.value.split("\n").length;
    setRows(newRows);
  };

  const handlePublish = async () => {
    if (text.trim() === "") {
      return;
    }
    const user = window.localStorage.getItem("username");
    try {
      const res = await axios.post(
        "http://localhost:3000/post/create",
        {
          username: user,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newPost = {
        username: res.data.username,
        createdAt: res.data.createdAt,
        text: res.data.text,
      };

      setPosts([newPost, ...posts]);
      setText("");
      setRows(1);
    } catch (error) {
      console.error("Error posting the text:", error);
    }
  };

  return (
    <div className="py-4 flex items-center mx-auto w-screen justify-center">
      <div className="flex items-center justify-center">
        <textarea
          rows={rows}
          value={text}
          onChange={handleChange}
          placeholder="Write your post..."
          className="p-3 mx-2 rounded-md bg-slate-950 border border-white max-w-[90vw] w-[400px]"
        />
        <button
          className="px-3 mx-2 rounded-lg bg-blue-600 text-white text-xl h-14 w-20"
          onClick={handlePublish}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
