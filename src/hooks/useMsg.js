import { useMutation } from "react-query";
import pb from "../pocketbase";

export default function useMsg() {
  async function sendMsg({ message, username }) {
    try {
      const sendedMsg = await pb
        .collection("messages")
        .create({ message: message, username: username });
      console.log(sendedMsg);
    } catch (e) {
      console.log(e);
    }
  }
  return useMutation(sendMsg);
}
