import axios from "axios";

const validateLogin = async (data) => {
  const getlogin_api = "/login";
  try {
    const result = await axios({
      method: "post",
      url: `http://localhost:8080/eform/api/v1${getlogin_api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { validateLogin };
