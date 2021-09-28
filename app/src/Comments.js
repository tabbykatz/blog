import * as React from "react";

import MDEditor from "@uiw/react-md-editor";

import * as apiClient from "./apiClient";

export const AddComment = ({ entry }) => {
  const [comment, setComment] = React.useState("**Say something nice!**");
  const [author, setAuthor] = React.useState("");

  const addComment = (entry_id) => {
    apiClient.addComment({
      body: comment,
      author: author,
      entry_id: entry_id,
    });
    setComment("");
    setAuthor("");
  };

  return (
    <>
      {" "}
      <details>
        <summary>Leave a comment</summary>
        <form>
          <MDEditor value={comment} onChange={setComment} />
          <input
            type="text"
            value={author}
            onChange={setAuthor}
            placeholder="Your name?"
            required
          />
          <button onClick={() => addComment(entry.id)}>Comment</button>
        </form>
      </details>
    </>
  );
};

export const CommentList = ({ entry }) => {
  return (
    <ul>
      {entry.comments.map((comment) => (
        <li key={comment?.id || entry.id}>
          {comment?.comment}
          {comment?.author ? `  - ${comment?.author}` : null}
        </li>
      ))}
    </ul>
  );
};
