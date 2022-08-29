import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, body } = req.body;

  const createPost = await db("posts").insert({
    title,
    body,
  });

  const post = await db("posts").where({ id: createPost }).first();
  res.status(200).json({ message: "Created Post Successfully!", data: post });
}
