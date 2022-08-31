import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fullName, email, password } = req.body;

  let bcrypt = require("bcryptjs");
  let salt = bcrypt.genSaltSync(10);
  let passwordHash = bcrypt.hashSync(password, salt);

  try {
    // Validation
    if (password.length < 8)
      return res
        .status(403)
        .json({ message: "Password length min. 8 character" });

    await db("users").insert({
      fullName,
      email,
      password: passwordHash,
    });

    res.status(200).json({ message: "Sign Up Successfully!" });
  } catch (err) {
    // Error Handling
    if (err.code === "ER_DUP_ENTRY")
      return res.status(403).json({ message: "Email already exist!" });

    res.status(403).json({ message: "Sign up unsuccessfully!" });
  }
}
