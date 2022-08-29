import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { jwt } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(403).end();
  const { email, password } = req.body;

  const dataUser = await db("users").where({ email }).first();
  // Validation Password
  let decoded = bcrypt.compareSync(password, dataUser.password);

  // TODO: Generate token

  if (!decoded)
    return res.status(403).json({ message: "Email or Password wrong!" });

  res.status(200).json({ message: "Login Sucessfully" });
}
