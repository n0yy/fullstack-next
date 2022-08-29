import db from "../../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  const { postId } = req.query;

  await db("posts").where({ id: postId }).del();
  res.status(200).json({ message: "Delete Post Successfully!" });
}
