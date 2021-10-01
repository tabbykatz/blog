import * as React from "react";

import MDEditor from "@uiw/react-md-editor";

import classes from "./Comments.module.scss";
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
      <form onSubmit={(e) => addComment(e)}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name?"
          required
        />
        <MDEditor className="markdown" value={comment} onChange={setComment} />
        <button className="pushable">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">comment</span>
        </button>
      </form>
    </>
  );
};

export const CommentList = ({ post }) => {
  return post.comments ? (
    <ul>
      {post.comments.map((comment) => (
        <li key={comment.id} className={classes.comment}>
          <MDEditor.Markdown source={comment.comment} />
          <p>
            <span className={classes.author}>{comment.author}</span>
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <div>No comments yet.</div>
  );
};
