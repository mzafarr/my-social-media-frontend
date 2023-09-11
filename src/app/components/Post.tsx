"use client";
import axios from "axios";
import React, { useState } from "react";
import { errorToast, successToast } from "../Toast";

function Post({ post, onDelete }: any) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(post.text);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async (postId: number, editedText: string) => {
    try {
      await axios.put(`http://localhost:3000/post/${postId}`, {
        text: editedText,
      });
      post.text = editedText;
      successToast("Post successfully updated.");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong.");
    }
  };

  const handleDeleteClick = async (postId: number) => {
    try {
      console.log("handleDelete");
      await axios.delete(`http://localhost:3000/post/${postId}`);
      onDelete(post.id);
      successToast("Post successfully deleted.");
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong.");
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded-lg shadow w-[95vw] max-w-[500px] my-4 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{post.text}</h2>
        <p className="text-sm text-gray-500">
          Posted on: {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      {isEditing ? (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded text-white bg-slate-950"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          ></textarea>
          <div className="mt-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white mr-2 rounded"
              onClick={() => handleSaveClick(post.id, editedText)}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4">{post.text}</p>
      )}
      <div className="mt-4 flex justify-end">
        {!isEditing && (
          <>
            <button
              className="px-2 py-1 bg-red-500 text-white mr-2 rounded"
              onClick={() => handleDeleteClick(post.id)}
            >
              Delete
            </button>

            <button
              className="px-2 py-1 bg-blue-500 text-white rounded"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
