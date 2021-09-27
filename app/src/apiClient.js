export const getEntries = () => _get("/api/entries");

export const addTask = (name) => _post("/api/tasks", { name });

export const addEntry = (entry) => {
  _post("/api/entries", entry);
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
