import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fullName, email, password } = req.body;

  let bcrypt = require("bcryptjs");
  let salt = bcrypt.genSaltSync(10);
  let passwordHash = bcrypt.hashSync(password, salt);

  const user = await db("users").insert({
    fullName,
    email,
    password: passwordHash,
  });

  // Get User
  const getUser = await db("users").where({ id: user }).first();

  res.status(200).json({ message: "Sign Up Successfully!", data: getUser });
}
