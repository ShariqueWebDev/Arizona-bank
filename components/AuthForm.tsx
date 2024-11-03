"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  // FormControl,
  // FormDescription,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage
} from "./ui/form";
//  import {Input} from "./ui/input"
import CustomInput from "@/components/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useRouter()
  const authSchema = authFormSchema(type);

  // 1. Define you form.
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  // 2. Define submit handler
  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if(type==='sign-in'){
        const response = await signIn({
          emai:data?.email,
          password:data?.password
        })

        if(response){
          navigate.push("/")
        }
      }
      setIsLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error, "FORM COULD NOT SUBMIT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href={"/"}
          className="cursor-pointer flex items-center gap-1 px-4"
        >
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Arizona logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Arizona
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-In" : "Sign-Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{"plaid text"}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <>
                {type === "sign-up" && (
                  <div className="">
                    <div className="flex gap-4 mb-5">
                      <CustomInput
                        id={"firstName"}
                        name={"firstName"}
                        label={"First Name"}
                        control={control}
                        placeholder={"Enter your first name"}
                      />
                      <CustomInput
                        id={"lastName"}
                        name={"lastName"}
                        label={"Last Name"}
                        control={control}
                        placeholder={"Enter your last name"}
                      />
                    </div>
                    <div className="mb-5">
                      <CustomInput
                        id={"address1"}
                        name={"address1"}
                        label={"Addresss"}
                        control={control}
                        placeholder={"Enter your Address"}
                      />
                    </div>
                    <div className="mb-5">
                      <CustomInput
                        id={"city"}
                        name={"city"}
                        label={"City"}
                        control={control}
                        placeholder={"Enter your city name"}
                      />
                    </div>
                    <div className="flex gap-4 mb-5">
                      <CustomInput
                        id={"state"}
                        name={"state"}
                        label={"State"}
                        control={control}
                        placeholder={"Example: NY"}
                      />
                      <CustomInput
                        id={"postalCode"}
                        name={"postalCode"}
                        label={"Postal Code"}
                        control={control}
                        placeholder={"Example: 11101"}
                      />
                    </div>
                    <div className="flex gap-4 mb-5">
                      <CustomInput
                        id={"dateOfBirth"}
                        name={"dateOfBirth"}
                        label={"Date of Birth"}
                        control={control}
                        placeholder={"YYYY-MM-DD"}
                      />{" "}
                      <CustomInput
                        id={""}
                        name={"ssn"}
                        label={"SSN"}
                        control={control}
                        placeholder={"Example: 1234"}
                      />{" "}
                    </div>
                  </div>
                )}
              </>
              <CustomInput
                id={"email"}
                name={"email"}
                label={"Email"}
                control={control}
                placeholder={"Enter your email"}
              />
              <CustomInput
                id={"password"}
                name={"password"}
                label={"Password"}
                control={control}
                placeholder={"Enter your password"}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex">
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </div>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
