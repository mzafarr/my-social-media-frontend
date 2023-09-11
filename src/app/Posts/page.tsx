"use client";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import CreatePost from "../components/CreatePost";
interface Post {
  username: string;
  createdAt: string | Date;
  // likes: number;
  text: string;
  id: number;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const username =
    typeof window !== "undefined"
      ? window.localStorage.getItem("username")
      : "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/user/${username}`
        );
        const userPosts = response.data;
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    };
    fetchData();
  }, [username]);

  const handleDeletePost = (postId: number) => {
    console.log('onDelete')
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold my-4">Posts</h1>
      <CreatePost posts={posts} setPosts={setPosts} />
      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
