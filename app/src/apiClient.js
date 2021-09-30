export const getPosts = () => _get("/api/posts");
export const getPostById = (id) => _get(`/api/posts/${id}`);
export const addPost = ({ title, post, slug }) => {
  _post("/api/posts", { title, post, slug });
};

export const editPost = ({ post, title, slug, post_id }) => {
  _put(`/api/posts/${post_id}`, { post, title, slug, post_id });
};

export const addComment = ({ comment, author, post_id }) => {
  _post(`/api/posts/${post_id}`, { comment, author, post_id });
};

const _post = _base("POST");
const _put = _base("PUT");
const _get = async (url) => (await fetch(url)).json();

function _base(method) {
  return async (url, body) => {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };
}
