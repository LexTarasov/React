import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const MyForm = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name please"),
    email: yup.string().email().required(),
    age: yup
      .number()
      .positive()
      .integer()
      .required("age must be a number")
      .min(13),
    password: yup.string().min(6).max(15).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Dont Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Hello...</h3>
      <h1>Register</h1>
      <input type="text" placeholder="Full name..." {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input type="text" placeholder=" Email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="text" placeholder=" Age..." {...register("age")} />
      <p>{errors.age?.message}</p>
      <input type="text" placeholder=" Password..." {...register("password")} />
      <p>{errors.password?.message}</p>
      <input
        type="text"
        placeholder=" Confirm Password..."
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" value="Submit" className="submit" />
      <p className="log-in">
        Already have an account? <span>Log In</span>
      </p>
    </form>
  );
};
