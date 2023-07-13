import Input from "@/Components/Core/Input";
import FormWrapper from "@/Components/Layout/FormWrapper";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    role: "owner",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/users/`, formData);

      toast.success("Account created");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      Object.keys((error as Record<string, any>).response.data).map((item) =>
        toast((error as Record<string, any>).response.data[item][0])
      );
    }
  };
  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <form noValidate onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label>First Name</label>
            <Input
              name="first_name"
              placeholder="Akwasi"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <Input
              name="last_name"
              placeholder="Afrifa"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label>Email</label>
            <Input
              name="email"
              placeholder="doe@haven.app"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Secured Password"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <button
            className="bg-primary text-neutral-100 p-2 px-3  font-semibold hover:bg-primary2"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Register;
