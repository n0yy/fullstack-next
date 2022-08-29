import jwt from "jsonwebtoken";

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(403).end();
    // Split Type and Token
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") return res.status(403).end();

    jwt.verify(token, "Aku Sayang Ibu", (err, decode) => {
      if (err) return res.status(403).end();
      return resolve(decode);
    });
  });
}
