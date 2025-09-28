import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { sendRegister } from "../services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/schemaRegister";




export default function Register() {
  const [loading, setloading] = useState(false);
  const [apiError, setApiError] = useState(null);


  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });


  const navigate=useNavigate()

  async function signUp(userData) {
    setloading(true)
     const response=await sendRegister(userData);
     console.log(response);


     if (response.message) {
      localStorage.setItem("userName", userData.name);
      navigate('/login')
     }
     else{
      setApiError(response.error)
     }
      setloading(false)
    console.log(userData);
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl py-10 px-6 w-full max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Register Now</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src="/src/assets/Reset password-amico.png"
            alt="register"
            className="w-3/4 max-w-sm mx-auto"
          />
        </div>

        <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">
          <Input
            isInvalid={Boolean(errors.name && touchedFields.name)}
            errorMessage={errors.name?.message}
            label="Name"
            variant="bordered"
            {...register("name")}
            type="text"
          />

          <Input
            isInvalid={Boolean(errors.email && touchedFields.email)}
            errorMessage={errors.email?.message}
            label="Email"
            variant="bordered"
            {...register("email")}
            type="email"
          />

          <Input
            isInvalid={Boolean(errors.password && touchedFields.password)}
            errorMessage={errors.password?.message}
            label="Password"
            variant="bordered"
            {...register("password")}
            type="password"
          />

          <Input
            isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
            errorMessage={errors.rePassword?.message}
            label="RePassword"
            variant="bordered"
            {...register("rePassword")}
            type="password"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)}
              errorMessage={errors.dateOfBirth?.message}
              label="DateOfBirth"
              variant="bordered"
              {...register("dateOfBirth")}
              type="date"
            />

            <Select
              isInvalid={Boolean(errors.gender && touchedFields.gender)}
              errorMessage={errors.gender?.message}
              variant="bordered"
              label="Select Your Gender"
              {...register("gender")}
            >
              <SelectItem key={"male"}>Male</SelectItem>
              <SelectItem key={"female"}>Female</SelectItem>
            </Select>
          </div>

          <Button isLoading={loading} type="submit" className="mt-4">
            Register
          </Button>
           <div>
            If you have account please <Link className="text-blue-600 font-bold" to={'/login'}>
            Sign Up
            </Link>
          </div>
          {apiError &&
          <span className="text-center text-red-800">
            {apiError}
          </span>
          }
        </form>
      </div>
    </div>
  );
}
