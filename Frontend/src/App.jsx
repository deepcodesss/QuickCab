import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Navbar from "./components/Navbar";
import UserHome from "./pages/UserHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import About from "./pages/About";
import CaptainKyc from "./pages/CaptainKyc";
import NotFound from "./pages/NotFound";
import Riding from "./pages/Riding";
import CaptainRiding from "./components/CaptainRiding";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/riding" element={
          <UserProtectWrapper>
          <Riding />
          </UserProtectWrapper>
          } />
        <Route path="/captain/riding" element={
          <CaptainProtectWrapper>
          <CaptainRiding />
          </CaptainProtectWrapper>
          } />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="captain/kyc" element={<CaptainKyc />} />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/user/home"
          element={
            <UserProtectWrapper>
              <UserHome />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain/home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
