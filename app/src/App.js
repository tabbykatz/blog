import * as React from "react";

import MDEditor from "@uiw/react-md-editor";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";

import { CommentList, AddComment } from "./Comments";
import Nav from "./Nav";
import * as apiClient from "./apiClient";

import "./global.scss";

const App = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route exact path="/add-post" element={<AddPost />} />
          <Route exact path="/" element={<Blog />} />
          <Route path="/post/:id/:slug" element={<Post />} />
        </Routes>
      </main>
    </>
  );
};

const AddPost = () => {
  const [post, setPost] = React.useState("Markdown &hearts;");
  const [title, setTitle] = React.useState("");
  let navigate = useNavigate();

  const addPost = (e) => {
    e.preventDefault();

    const slug = slugify(title);
    const blogPost = {
      title,
      post,
      slug,
    };
    apiClient.addPost(blogPost);
    setPost("");
    setTitle("");
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => addPost(e)}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title"
            required
          />
          <MDEditor className="markdown" value={post} onChange={setPost} />

          <button className="pushable">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">post</span>
          </button>
        </form>
      </div>
    </>
  );
};

const Post = () => {
  const [post, setPost] = React.useState({});

  const { id } = useParams();

  const loadPost = async () => setPost(await apiClient.getPostById(id));
  React.useEffect(() => {
    loadPost(id);
  }, []);

  return (
    <>
      <MDEditor.Markdown source={post.post} />
      <CommentList {...{ post }} />
      <AddComment {...{ post, loadPost }} />
    </>
  );
};

const Blog = () => {
  const [posts, setPosts] = React.useState([]);

  const loadPosts = async () => setPosts(await apiClient.getPosts());
  React.useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default App;
