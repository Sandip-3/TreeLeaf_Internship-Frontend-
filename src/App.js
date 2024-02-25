import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
const Table = lazy(() => import("./components/Table"));
const Register = lazy(() => import("./components/Login"));
const Loading = lazy(() => import("./components/Loading"));
const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}> 
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
