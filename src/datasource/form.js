import axios from "axios";

const getFormList = async (full_access, username) => {
  const getFormApi = `/form/${full_access}/${username}`;
  try {
    const result = await axios({
      method: "get",
      url: `http://localhost:8080/eform/api/v1${getFormApi}`,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getForm1Details = async (form_id) => {
  const getForm1Api = `/form1/${form_id}`;
  try {
    const result = await axios({
      method: "get",
      url: `http://localhost:8080/eform/api/v1${getForm1Api}`,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const insertForm1Details = async (data) => {
  const form1api = "/form1";
  try {
    const result = await axios({
      method: "post",
      url: `http://localhost:8080/eform/api/v1${form1api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateForm1Status = async (data) => {
  const form1api = "/form1/status";
  try {
    const result = await axios({
      method: "patch",
      url: `http://localhost:8080/eform/api/v1${form1api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateForm1Details = async (data) => {
  const form1api = "/form1";
  try {
    const result = await axios({
      method: "patch",
      url: `http://localhost:8080/eform/api/v1${form1api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getform2Details = async (form_id) => {
  const getform2Api = `/form2/${form_id}`;
  try {
    const result = await axios({
      method: "get",
      url: `http://localhost:8080/eform/api/v1${getform2Api}`,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const insertform2Details = async (data) => {
  const form2api = "/form2";
  try {
    const result = await axios({
      method: "post",
      url: `http://localhost:8080/eform/api/v1${form2api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateform2Status = async (data) => {
  const form2api = "/form2";
  try {
    const result = await axios({
      method: "patch",
      url: `http://localhost:8080/eform/api/v1${form2api}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const batchApproveForm = async (data) => {
  const formapi = "/form/batch";
  try {
    const result = await axios({
      method: "post",
      url: `http://localhost:8080/eform/api/v1${formapi}`,
      data: data,
    });

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getFormList,
  getForm1Details,
  insertForm1Details,
  updateForm1Status,
  updateForm1Details,
  getform2Details,
  insertform2Details,
  updateform2Status,
  batchApproveForm,
};
