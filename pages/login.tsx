// import { watch } from "fs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import bgSrc from "../public/bg.jpg";
import { SubmitHandler } from "react-hook-form/dist/types";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { signUp, signIn } = useAuth();
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative w-screen h-screen grid place-content-center">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className="w-[100%] h-[100%] absolute object-cover pointer-events-none
         -z-[1]"
        src={bgSrc}
        alt={"Login background"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 bg-[#000000]/90 space-y-4 flex flex-col md:min-w-[450px]"
      >
        <h1 className="text-4xl mb-3 font-medium">Sign In</h1>
        <input
          type="email"
          className="basic-input"
          placeholder="Email"
          {...register("email", { required: true, maxLength: 50 })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="password"
          className="basic-input"
          placeholder="Password"
          {...register("password", { required: true, maxLength: 50 })}
        />
        {errors.password && <span>This field is mandatory</span>}
        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="bg-[#E50914] !mt-6 mb-4 py-3 font-medium rounded "
        >
          Sign In
        </button>
        <div className="flex gap-2">
          <p className="text-[gray]">New to Netflix?</p>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
