import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // jwt.sign() is used to create a new JWT.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
  // The first argument { userId } is the payload, which contains the data to be stored inside the token—in this case, the user's ID.
  // process.env.JWT_SECRET is the secret key used to sign the token, ensuring that it can't be tampered with. This secret should be kept safe and stored in environment variables.
  // { expiresIn: "30d" } specifies that the token will expire in 30 days.
  //
  //
  //
  //
  // set jwt as an HTTP-ONLY Cookie
  // res.cookie("jwt", token, { ... }) sets the generated token as a cookie in the user's browser.
  res.cookie("jwt", token, {
    httpOnly: true,
    // httpOnly: true makes the cookie inaccessible to JavaScript running in the browser, providing additional security against cross-site scripting (XSS) attacks.
    secure: process.env.NODE_ENV !== "development",
    // secure: process.env.NODE_ENV !== "development" ensures the cookie is sent over HTTPS only when the app is not in development mode, adding an extra layer of security in production.
    sameSite: "strict",
    // sameSite: "strict" restricts the cookie from being sent in cross-site requests, reducing the risk of CSRF (Cross-Site Request Forgery) attacks.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // maxAge: 30 * 24 * 60 * 60 * 1000 sets the cookie to expire after 30 days.
  });

  return token;
};

export default generateToken;
