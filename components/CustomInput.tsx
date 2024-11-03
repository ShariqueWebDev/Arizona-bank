import React from "react";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");
interface CustomInputProps {
  id: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  control: Control<z.infer<typeof formSchema>>;
  placeholder: string;
}

const CustomInput = ({
  id,
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  const uniqueId = `${id || `input-${name}`}`;

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label" htmlFor={uniqueId}>{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  id={uniqueId}
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                  type={name === "password" ? "password" : "text"}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
