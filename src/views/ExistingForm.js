import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Form1 from "../components/ExistingForm/Form1";
import Form2 from "../components/ExistingForm/Form2";

const ExsitingForm = () => {
  const params = useParams();

  const renderSwitch = (form_type_id) => {
    switch (form_type_id) {
      case "1":
        return <Form1 isCreate={false} />;
      case "2":
        return <Form2 isCreate={false} />;
      default:
        return;
    }
  };
  return <Fragment>{renderSwitch(params.form_type_id)}</Fragment>;
};

export default ExsitingForm;
