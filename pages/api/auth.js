import basicAuth from "basic-auth";

export default async function handler(req, res) {
  // llamar a endpoint de login
  // y devolver token
  const user = basicAuth(req);

  console.log("body", user);
  res.status(200).json({ token: "some token" });
}
