import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const allPosts = await db("posts");
  console.log(allPosts.length);
  res.status(200).json({ numberOfPosts: allPosts.length, data: allPosts });
}
