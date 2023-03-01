import React, { useEffect, useState } from "react";
import { Container, Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import pb from "../pocketbase";
import useLogout from "../hooks/useLogout";
import useMsg from "../hooks/useMsg";

const Chat = () => {
  const logout = useLogout();
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading, isError } = useMsg();
  const [backdata, setBackData] = useState([]);
  const [time, setTime] = useState(false);
  async function onSubmit(data) {
    setTimeout(() => {
      setTime((time) => !time);
    }, 1000);
    mutate({ message: data.message, username: pb.authStore.model.username });
    reset();
    setTime((time) => !time);
  }
  async function getMsg() {
    const resp = await fetch(
      "http://127.0.0.1:8090/api/collections/messages/records"
    );
    const data = await resp.json();
    setBackData((backdata) => [data.items]);
  }
  useEffect(() => {
    getMsg();
    console.log(backdata);
  }, [time]);
  return (
    <div>
      {isLoading && (
        <p style={{ position: "absolute", top: 0, left: 0 }}>Loading...</p>
      )}
      <Container p={5} position={"relative"} height={"100vh"}>
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h1>
            Logged as:{" "}
            {pb.authStore.isValid.toString() && pb.authStore.model.email}
          </h1>
          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </Flex>
        <hr />
        <Flex flexDirection={"column"}>
          {backdata?.map((msg) =>
            msg.map((m, idx) => (
              <Flex
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                key={idx}
              >
                <p style={{ width: "60%", margin: "3px 0" }}>
                  <strong>{m.username}: </strong>
                  {m.message}
                </p>
                <span className="time">{m.created}</span>
              </Flex>
            ))
          )}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Type here..."
            position={"absolute"}
            bottom={"20px"}
            left={"0"}
            {...register("message")}
            minLength={5}
            disabled={time}
            required
          />
        </form>
      </Container>
    </div>
  );
};

export default Chat;
