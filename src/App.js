import "./App.css";

import React, { Fragment, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from "./views/MainView";
import FormList from "./views/FormList";
import NewForm from "./views/NewForm";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainView />}>
            <Route path="/list" element={<FormList />} />
            <Route path="/form/create" element={<NewForm />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
