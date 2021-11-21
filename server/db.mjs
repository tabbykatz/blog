import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getPostsWithComments = () =>
  db.any(
    "SELECT posts.*, JSON_AGG(comments) AS comments FROM posts LEFT JOIN comments ON posts.id = comments.post_id GROUP BY posts.id ORDER BY posts.id DESC",
  );

export const getPostById = (id) =>
  db.one(
    "SELECT posts.*, COALESCE(json_agg(comments) FILTER (WHERE comments IS NOT NULL), '[]') AS comments FROM posts LEFT JOIN comments ON posts.id = comments.post_id WHERE posts.id = ${ id } GROUP BY posts.id",
    { id },
  );

export const addPost = ({ post, title, slug }) =>
  db.any(
    "INSERT INTO posts(post, title, slug) VALUES(${post}, ${title}, ${slug}) RETURNING *",
    { post, title, slug },
  );

export const addComment = ({ comment, author, post_id }) =>
  db.any(
    "INSERT INTO comments (comment, author, post_id) VALUES (${comment}, ${author}, ${post_id}) RETURNING *",
    { comment, author, post_id },
  );
export const editPost = ({ post, title, slug, post_id }) =>
  db.any(
    "UPDATE posts SET slug = ${slug}, post = ${post}, title= ${title} where id = ${post_id} RETURNING *",
    { post, title, slug, post_id },
  );
function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
