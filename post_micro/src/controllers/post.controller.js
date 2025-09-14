import * as service from "../services/post.service.js";

export async function health(req, res) {
  res.json({ status: "ok", service: "post_micro" });
}

export async function createPost(req, res) {
  try {
    const post = await service.createPost(req.user.id, req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getPosts(req, res) {
  const posts = await service.getPosts();
  res.json(posts);
}

export async function getPostById(req, res) {
  try {
    const post = await service.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function updatePost(req, res) {
  try {
    const post = await service.updatePost(req.params.id, req.user.id, req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletePost(req, res) {
  try {
    await service.deletePost(req.params.id, req.user.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
