import db from "../../../../utils/db";
import authorization from "../../../../utils/middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const verify = await authorization(req, res);
  if (!verify) return res.status(403).end();

  const { postId } = req.query;
  const { title, body } = req.body;

  //  Updating
  await db("posts").where({ id: postId }).update({ title, body });

  const updatedPost = await db("posts").where({ id: postId }).first();
  res
    .status(200)
    .json({ message: "Post Updated Successfully!", data: updatedPost });
}
