import React, { Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// Custom Component
import Main from "../components/Main";

const MainView = () => {
  return (
    <Fragment>
      <Main>
        <Outlet />
      </Main>
    </Fragment>
  );
};

export default MainView;
