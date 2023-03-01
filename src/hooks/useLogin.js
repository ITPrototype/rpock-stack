import pb from "../pocketbase";
import { useMutation } from "react-query";
export default function useLogin() {
  async function login({ email, password }) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log(authData);
  }
  return useMutation(login);
}
