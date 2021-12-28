import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  return fs
    .readdirSync(postsDirectory)
    .map(getPostData)
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post?.isFeatured);
}
