import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(403).end();
  const { email, password } = req.body;

  const dataUser = await db("users").where({ email }).first();
  // Validation Email
  if (email !== dataUser?.email) {
    return res.status(403).json({ message: "Wrong Email!" });
  }

  // Validation Password
  let decoded = bcrypt.compareSync(password, dataUser.password);
  if (!decoded) return res.status(403).json({ message: "Password wrong!" });

  // TODO: Generate token | JWT
  const token = jwt.sign(
    { data: { id: dataUser.id, fullname: dataUser.fullName, email } },
    process.env.SECRET_KEY
  );
  res.status(200).json({
    message: "Login Sucessfully",
    token,
  });
}
