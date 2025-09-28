import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { sendLogin } from "../services/authServices";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/schemaLogin";
import { AuthContext } from "../Context/AuthContext";





export default function Login() {
  const [loading, setloading] = useState(false);
  const [apiError, setApiError] = useState(null);


  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
     
      email: "",
      password: "",
      
      
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });


  const navigate=useNavigate();
  const{setIsLoggedIn}=useContext(AuthContext)

  async function signIn(userData) {
    setloading(true)
     const response=await sendLogin(userData);
    


     if (response.message) {

      localStorage.setItem('token' , response.token);
      setIsLoggedIn(response.token)
       localStorage.setItem("userName", userData.email);
      navigate('/')
     }
     else{
      setApiError(response.error)
     }
      setloading(false)
    
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl py-10 px-6 w-full max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Login Now</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      

        <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-4">
          
          

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

         
         



          <Button isLoading={loading} type="submit" className="mt-4">
            Login
          </Button>
          <div>
            If you haven't account please <Link className="text-blue-600 font-bold" to={'/register'}>
            Sign Up
            </Link>
          </div>
          {apiError &&
          <span className="text-center text-red-800">
            {apiError}
          </span>
          }
        </form>


          <div className="flex justify-center">
          <img
            src="/src/assets/Authentication-rafiki.png"
            alt="register"
            className="w-3/4 max-w-sm mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
