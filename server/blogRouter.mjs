import express from "express";

import * as db from "./db.mjs";

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const entries = await db.getEntriesWithComments();
  response.json(entries);
});

blogRouter.use(express.json());
blogRouter.post("/", async (request, response) => {
  response.status(201).json(await db.addEntry(request.body));
});
blogRouter.post("/:id", async (request, response) => {
  response.status(201).json(await db.addComment(request.body));
});
blogRouter.put("/:id", async (request, response) => {
  response.status(201).json(await db.editEntry(request.body));
});

export default blogRouter;
