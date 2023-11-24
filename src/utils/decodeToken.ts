import jwt from "jsonwebtoken";

export const decodeToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY || "qwerty");
  return token;
};
