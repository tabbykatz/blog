import * as React from "react";

import { Global, css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import MDEditor from "@uiw/react-md-editor";
import { Routes, Route, Link, useParams } from "react-router-dom";

import { CommentList, AddComment } from "./Comments";
import * as apiClient from "./apiClient";

const App = () => {
  const [entries, setEntries] = React.useState([]);

  const loadEntries = async () => setEntries(await apiClient.getEntries());
  React.useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Blog</Link> | <Link to="post">Write Post</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/post" element={<WritePost {...{ loadEntries }} />} />
          <Route path="/" element={<Blog {...{ entries }} />} />
          <Route path="/:slug" element={<Post {...{ entries }} />} />
        </Routes>
      </main>
    </>
  );
};

const WritePost = ({ loadEntries }) => {
  const [entry, setEntry] = React.useState("Markdown &hearts;");
  const [title, setTitle] = React.useState("");

  const addEntry = (e) => {
    e.preventDefault();
    const makeSlugFromTitle = (s) => {
      s = s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
      return s.split(/\s+/).join("-");
    };
    const slug = makeSlugFromTitle(title);
    const blogEntry = {
      title,
      entry,
      slug,
    };
    apiClient.addEntry(blogEntry);
    setEntry("");
    setTitle("");
    loadEntries();
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => addEntry(e)}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title"
            required
          />
          <MDEditor value={entry} onChange={setEntry} />
          <button>Post</button>
        </form>
      </div>
    </>
  );
};

const Post = ({ entries }) => {
  const findPostBySlug = (slug) => {
    console.log("Hello", { slug });
    return entries.find((entry) => entry.slug === slug);
  };
  const { slug } = useParams();

  const entry = findPostBySlug(slug);

  return (
    <>
      <MDEditor.Markdown source={entry.entry} />
      <CommentList {...{ entry }} />
      <AddComment {...{ entry }} />
    </>
  );
};

const Blog = ({ entries }) => {
  return (
    <>
      {entries.map((entry) => (
        <Link
          to={"/" + entry.slug}
          key={entry.slug}
          element={<Post {...{ entries }} />}
        >
          <div className="post">
            <h1>{entry.title}</h1>
          </div>
        </Link>
      ))}
    </>
  );
};

export default App;
