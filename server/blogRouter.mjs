import express from "express";

import * as db from "./db.mjs";

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const posts = await db.getPostsWithComments();
  response.json(posts);
});
blogRouter.get("/:id", async (request, response) => {
  const post = await db.getPostById(request.params.id);
  response.json(post);
});

blogRouter.use(express.json());
blogRouter.post("/", async (request, response) => {
  response.status(201).json(await db.addPost(request.body));
});
blogRouter.post("/:id", async (request, response) => {
  response.status(201).json(await db.addComment(request.body));
});
blogRouter.put("/:id", async (request, response) => {
  response.status(201).json(await db.editPost(request.body));
});

export default blogRouter;
