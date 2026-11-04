import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputComponent from "./inputComponent";
import "rsuite/dist/rsuite.css";
import { Form, ButtonToolbar, Button, PasswordInput } from "rsuite";

export default function LoginForm() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email Format")
      .required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password cannot be less than 6 Characters")
      .required("Password is Requrired"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-75 mx-auto">
      <h2 className="ms-4 my-2">Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Stack>
          <InputComponent
            name="email"
            label="Email:"
            type="email"
            error={errors.email?.message}
            register={register}
          />
          <InputComponent
            name="password"
            label="Password:"
            error={errors.password?.message}
            accepter={PasswordInput}
            register={register}
          />
          <ButtonToolbar>
            <Button appearance="primary" onSubmit={handleSubmit} type="submit">
              Submit
            </Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Stack>
      </Form>
    </div>
  );
}
