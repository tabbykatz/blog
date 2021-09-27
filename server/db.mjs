import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getEntries = () => db.any("SELECT * FROM entries");

export const addEntry = ({ value }) =>
  db.one("INSERT INTO entries(entry) VALUES(${value}) RETURNING *", { value });

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
