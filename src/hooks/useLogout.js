import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";

export default function useLogout() {
  let navigate = useNavigate();
  function logout() {
    pb.authStore.clear();
    navigate("/");
  }
  return logout;
}
