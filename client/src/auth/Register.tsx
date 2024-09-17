import { register } from "@/api/auth";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().min(1, "Email is required."),
  password: z.string().min(4, "Password is required."),
});

type T_Form = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("auth_user") || "";

  const [isShowPassword, setIsShowPassword] = useState(false);

  const form = useForm<T_Form>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: T_Form) => {
    const data = await register(formData);

    if (!data.s) {
      toast.error(data.m || "Opps! something went wrong!");
      return;
    }

    toast.success(data.m);
    navigate("/login");
  };

  useEffect(() => {
    if (userId) return navigate("/");
  }, [userId]);

  return (
    <div
      className="flex justify-center items-center h-dvh px-6 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/auth-bg.jpg)",
      }}
    >
      <div className="bg-white rounded-xl p-8 w-full md:max-w-md">
        <h3 className="text-center font-bold text-2xl">Create Acccount</h3>
        <p className="text-center text-gray-500 font-semibold">
          Register to continue the app
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-3"
          >
            <FormInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
            />
            <FormInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type={isShowPassword ? "text" : "password"}
              RightIcon={
                isShowPassword ? (
                  <EyeIcon onClick={() => setIsShowPassword(!isShowPassword)} />
                ) : (
                  <EyeOff onClick={() => setIsShowPassword(!isShowPassword)} />
                )
              }
            />

            <Button className="w-full h-11"> Sign in </Button>
          </form>

          <div className="mt-6 text-end">
            <Link to={"/login"} className="text-blue-500 underline">
              Login{" "}
            </Link>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
