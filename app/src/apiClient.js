export const getEntries = () => _get("/api/entries");

export const addEntry = (entry) => {
  _post("/api/entries", entry);
};

export const addComment = ({ body, author, entry_id }) => {
  _post(`/api/entries/${entry_id}`, { body, author, entry_id });
};
const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
