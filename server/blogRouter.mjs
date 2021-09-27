import express from "express";

import * as db from "./db.mjs";

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const entries = await db.getEntries();
  response.json(entries);
});

blogRouter.use(express.json());
blogRouter.post("/", async (request, response) => {
  const entry = await db.addEntry(request.body);
  console.log(entry);
  response.status(201).json(entry);
});

export default blogRouter;
