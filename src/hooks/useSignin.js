import pb from "../pocketbase";
import { useMutation } from "react-query";
import useLogin from "./useLogin";
export default function useSignin() {
  const { mutate, isLoading, isError } = useLogin();
  async function signin({ username, email, password }) {
    try {
      const authData = await pb.collection("users").create({
        username: username,
        email: email,
        password: password,
        passwordConfirm: password,
      });
      console.log(authData);
      setTimeout(async () => {
        mutate({ email: email, password: password });
      }, 900);
    } catch (e) {
      alert(e);
    }
  }
  return useMutation(signin);
}
