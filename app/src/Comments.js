import * as React from "react";

import MDEditor from "@uiw/react-md-editor";

import * as apiClient from "./apiClient";

export const AddComment = ({ post, loadPost }) => {
  const [comment, setComment] = React.useState("**Say something nice!**");
  const [author, setAuthor] = React.useState("");

  const addComment = (e) => {
    e.preventDefault();
    apiClient.addComment({
      comment: comment,
      author: author,
      post_id: post.id,
    });
    setComment("**Say something nice!**");
    setAuthor("");
    loadPost(post.id);
  };
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

export const CommentList = ({ post }) => {
  return post.comments ? (
    <ul>
      {post.comments.map((comment) => (
        <li key={comment.id}>
          <MDEditor.Markdown source={comment.comment} />
          <p>- {comment.author}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div>No comments yet.</div>
  );
};
