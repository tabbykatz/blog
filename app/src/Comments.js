import * as React from "react";

import MDEditor from "@uiw/react-md-editor";

import * as apiClient from "./apiClient";

export const AddComment = ({ entry }) => {
  const [comment, setComment] = React.useState("**Say something nice!**");
  const [author, setAuthor] = React.useState("");

  const addComment = (e) => {
    e.preventDefault();
    apiClient.addComment({
      comment: comment,
      author: author,
      entry_id: entry.id,
    });
    setComment("");
    setAuthor("");
  };
  console.log(entry);
  return (
    <>
      {" "}
      <details>
        <summary>Leave a comment</summary>
        <form onSubmit={(e) => addComment(e)}>
          <MDEditor value={comment} onChange={setComment} />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name?"
            required
          />
          <button>Comment</button>
        </form>
      </details>
    </>
  );
};

export const CommentList = ({ entry }) => {
  return entry.comments[0] === null ? (
    <div>No comments yet.</div>
  ) : (
    <ul>
      {entry.comments.map((comment) => (
        <MDEditor.Markdown key={comment.id} source={comment.comment} />
      ))}
    </ul>
  );
};
