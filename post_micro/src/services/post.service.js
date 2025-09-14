import prisma from "../config/prismaClient.js";

export async function createPost(authorId, data) {
  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId
    }
  });
}

export async function getPosts() {
  return await prisma.post.findMany();
}

export async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: { id }
  });
  if (!post) throw new Error("Post not found");
  return post;
}

export async function updatePost(id, authorId, data) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== authorId) throw new Error("Not authorized to update this post");

  return await prisma.post.update({
    where: { id },
    data
  });
}

export async function deletePost(id, authorId) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== authorId) throw new Error("Not authorized to delete this post");

  return await prisma.post.delete({ where: { id } });
}
