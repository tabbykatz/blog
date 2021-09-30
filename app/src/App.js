import * as React from "react";

import MDEditor from "@uiw/react-md-editor";
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import slugify from "slugify";

import { CommentList, AddComment } from "./Comments";
import * as apiClient from "./apiClient";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Blog</Link> | <Link to="add-post">Write Post</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/add-post" element={<WritePost />} />
          <Route path="/" element={<Blog />} />
          <Route path="/post/:id/:slug" element={<Post />} />
        </Routes>
      </main>
    </>
  );
};

const WritePost = () => {
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
          <MDEditor value={post} onChange={setPost} />
          <button>Post</button>
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
