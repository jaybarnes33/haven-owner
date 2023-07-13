import Input from "@/Components/Core/Input";
import FormWrapper from "@/Components/Layout/FormWrapper";

import { AuthError } from "@/helpers/constructors";
import axios from "axios";
import { useRouter } from "next/router";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: logged } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/jwt/create`,
        data
      );

      sessionStorage.setItem("haven_token", logged.access);
      toast.success("Log in successful");
      router.push("/");
    } catch (error) {
      console.log(error);
      Object.keys((error as Record<string, any>).response.data).map((item) =>
        toast(
          typeof (error as Record<string, any>).response.data[item] == "string"
            ? (error as Record<string, any>).response.data[item]
            : (error as Record<string, any>).response.data[item][0]
        )
      );
    }
  };
  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <form noValidate onSubmit={onSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <Input
            placeholder="hey@hey.com"
            required
            onChange={handleChange}
            name="email"
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            type="password"
            placeholder="Secured Password"
            required
            onChange={handleChange}
            name="password"
          />
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-primary text-neutral-100 p-2 px-3  font-semibold hover:bg-primary2"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Login;
