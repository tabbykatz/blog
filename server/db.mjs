import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getEntriesWithComments = () =>
  db.any(
    "SELECT entries.*, JSON_AGG(comments) AS comments FROM entries LEFT JOIN comments ON entries.id = comments.entry_id GROUP BY entries.id ORDER BY entries.id DESC",
  );

export const addEntry = ({ body }) =>
  db.one("INSERT INTO entries(entry) VALUES(${body}) RETURNING *", { body });

export const addComment = ({ comment, author, entry_id }) =>
  db.any(
    "INSERT INTO comments (comment, author, entry_id) VALUES (${comment}, ${author}, ${entry_id}) RETURNING *",
    { comment, author, entry_id },
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
