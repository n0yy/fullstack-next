import db from "../../../../utils/db";
import authorization from "../../../../utils/middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const verify = await authorization(req, res);
  if (!verify) return res.status(403).end();

  const { postId } = req.query;
  await db("posts").where({ id: postId }).del();

  const freshData = await db("posts");
  res.status(200).json({ freshData });
}
