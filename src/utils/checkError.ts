const checkError = (e: any) => {
  if (e.message === "token field empty") {
    return {
      status: 403,
      message: "Not authorization",
    };
  } else {
    return {
      status: 404,
      message: "error",
    };
  }
};

export default checkError;
