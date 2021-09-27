import * as React from "react";

import MDEditor from "@uiw/react-md-editor";
import { Routes, Route, Link } from "react-router-dom";

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
  const [value, setValue] = React.useState("**Hello world!!!**");

  const addEntry = () => {
    apiClient.addEntry(value);
    setValue("");
  };
  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      {/* <MDEditor.Markdown source={value} /> */}
      <button onClick={() => addEntry()}>Post</button>
    </div>
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
        <MDEditor.Markdown key={entry.id} source={entry.entry} />
      ))}
    </>
  );
};

export default App;
