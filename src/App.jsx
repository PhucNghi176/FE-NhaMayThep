import "./App.css";
import './App.css'
import Login from './pages/Login/Login'
import Signup from "./pages/Login/Signup";
import { Route, Routes, useNavigate } from "react-router";
import AdminRouter from "./router/AdminRouter";
import { useEffect } from "react";
import { message } from "antd";

function App() {
  const nav = useNavigate()
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === "" || token === null || token === undefined) {
      message.error("Bạn Cần Phải Đăng Nhập Để Sử Dụng Hệ Thống");
      nav("/");
    } 
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="admin/*" element={<AdminRouter />} />
      <Route path="/Signup" element={<Signup />}></Route>
      {/* <Route path="/layout/g9" element={<PositionManagement/>}></Route> */}
    </Routes>
  );
}

export default App;
