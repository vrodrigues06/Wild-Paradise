import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm({ animation = "" }) {
  const [email, setEmail] = useState("devpro@vrodrigues06.com");
  const [password, setPassword] = useState("pass1234");
  const { isLoading, loginFn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    loginFn(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} animation={animation}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          {isLoading ? (
            <>
              <SpinnerMini /> Authenticating...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
