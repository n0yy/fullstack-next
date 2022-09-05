import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(403).end();

  const { postId } = req.query;

  const post = await db("posts").where({ id: postId }).first();
  return res.status(200).json({ data: post });
}
