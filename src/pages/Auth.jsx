import { Button, Container, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import pb from "../pocketbase";
import useSignin from "../hooks/useSignin";

const Auth = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading, isError } = useLogin();
  const { mutate: signin, isLoading: loading } = useSignin();
  const [isReg, setIsreg] = useState(false);
  const navigate = useNavigate();

  let isLogged = pb.authStore.isValid;

  async function onSubmit(data) {
    console.log("Submit works");
    mutate({
      email: data.email,
      password: data.password,
    });
    reset();
  }
  async function onRegister(data) {
    signin({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    isLogged = true;
    reset();
  }
  function handleChange() {
    setIsreg((isReg) => !isReg);
  }
  useEffect(() => {
    if (isLogged) return navigate("/chat");
  }, [isLogged, isReg]);
  return (
    <Container margin={"200px auto"}>
      {isError && <p style={{ color: "red" }}>Invalid email or password</p>}
      <h1>Please {isReg ? "sign in" : "login"}!</h1>
      <form onSubmit={handleSubmit(isReg ? onRegister : onSubmit)}>
        {isReg ? (
          <Input
            placeholder="username"
            marginTop={"3"}
            marginBottom={"3"}
            {...register("username")}
            required
          />
        ) : null}
        <Input
          type="email"
          placeholder="email"
          {...register("email")}
          marginTop={"3"}
          marginBottom={"3"}
          required
        />
        <Input
          type="password"
          placeholder="password"
          marginTop={"3"}
          marginBottom={"3"}
          {...register("password")}
          required
        />
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button type="submit" colorScheme="blue" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <NavLink to={"/"} style={{ color: "blue" }} onClick={handleChange}>
            {isReg ? "Login" : "Sign In"}
          </NavLink>
        </Flex>
      </form>
    </Container>
  );
};

export default Auth;
