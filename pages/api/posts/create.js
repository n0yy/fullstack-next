import db from "../../../utils/db";
import authorization from "../../../utils/middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(403).json({ message: "Failed" });

  const { title, body } = req.body;

  const verify = await authorization(req, res);
  if (!verify) return res.status(405).end();

  const createPost = await db("posts").insert({
    title,
    body,
  });

  const post = await db("posts").where({ id: createPost }).first();

  res.status(200).json({
    message: "Create Post Successfully!",
    data: post,
  });
}
