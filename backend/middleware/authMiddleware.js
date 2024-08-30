import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read  jwt from cookie

  token = req.cookie.jwt;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not autherized token failed");
    }
  } else {
    res.status(401);
    throw new Error("No auth No token");
  }
});

//Check for Admin
// const authorizeAmin = (req, res, next)
