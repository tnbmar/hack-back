import jwt from "jsonwebtoken";

export const encodeToken = (token?: string) => {
  try {
    if (!token) return;
    const user = jwt.verify(token, process.env.SECRET_KEY || "");

    if (typeof user === "string") return;
    return user.id;
  } catch (e) {
    console.error({ e });
    throw new Error(e as string);
  }
};
