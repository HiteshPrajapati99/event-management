import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import Label from "../ui/label";
import HelperText from "../ui/helperText";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  classes?: {
    inputRoot?: string;
    label?: string;
    helperText?: string;
    inputContainer?: string;
  };
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  classes,
  LeftIcon,
  RightIcon,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Label
            htmlFor={name}
            label={label}
            error={Boolean(errors?.[name])}
            className={classes?.label}
          />

          <Input
            {...field}
            type={type}
            placeholder={placeholder || ""}
            RightIcon={RightIcon}
            LeftIcon={LeftIcon}
            className={classes?.inputRoot}
            paperClassName={classes?.inputContainer}
            value={type === "file" ? undefined : field.value || ""}
            multiple={type === "file" ? true : false}
            onChange={(e) => {
              if (type === "file") {
                const files = Array.from(e.target.files || []);
                field.onChange(files);
              } else {
                field.onChange(e.target.value);
              }
            }}
            onBlur={field.onBlur}
          />

          <HelperText
            error={Boolean(errors?.[name])}
            text={errors?.[name]?.message as string}
          />
        </div>
      )}
    />
  );
};

export default FormInput;
