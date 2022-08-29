import db from "../../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const { postId } = req.query;
  const { title, body } = req.body;

  //  Updating
  await db("posts").where({ id: postId }).update({ title, body });

  const updatedPost = await db("posts").where({ id: postId }).first();
  res
    .status(200)
    .json({ message: "Post Updated Successfully!", data: updatedPost });
}
