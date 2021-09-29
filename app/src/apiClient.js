export const getEntries = () => _get("/api/entries");

export const addEntry = ({ title, entry, slug }) => {
  _post("/api/entries", { title, entry, slug });
};

export const editEntry = ({ entry, title, slug, entry_id }) => {
  _put(`/api/entries/${entry_id}`, { entry, title, slug, entry_id });
};

export const addComment = ({ comment, author, entry_id }) => {
  _post(`/api/entries/${entry_id}`, { comment, author, entry_id });
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
