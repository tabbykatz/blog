import * as React from "react";

import MDEditor from "@uiw/react-md-editor";
import { Routes, Route, Link } from "react-router-dom";

import { AddComment, CommentList } from "./Comments";
import * as apiClient from "./apiClient";

const App = () => (
  <>
    <nav>
      <Link to="/">Blog</Link> | <Link to="post">Write Post</Link>
    </nav>
    <main>
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/" element={<Blog />} />
      </Routes>
    </main>
  </>
);

const Post = () => {
  const [value, setValue] = React.useState("");

  const addEntry = () => {
    apiClient.addEntry({ body: value });
    console.log({ body: value });
    setValue("");
  };
  return (
    <>
      <div className="container">
        <MDEditor value={value} onChange={setValue} />
        {/* <MDEditor.Markdown source={value} /> */}
        <button onClick={() => addEntry()}>Post</button>
      </div>
      <pre>{value}</pre>
    </>
  );
};

const Blog = () => {
  const [entries, setEntries] = React.useState([]);

  const loadEntries = async () => setEntries(await apiClient.getEntries());
  React.useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      {entries.map((entry) => (
        <div key={entry.id}>
          <MDEditor.Markdown source={entry.entry} />
          <CommentList {...{ entry }} />
          <AddComment {...{ entry }} />
        </div>
      ))}
    </>
  );
};

export default App;
