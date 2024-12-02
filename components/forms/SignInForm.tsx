"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useShowErrorOfState } from "@/hooks/useShowError";

const SignInForm = () => {
  const [state, action] = useActionState(signInAction, undefined);
  const { pending } = useFormStatus();

  const { push } = useRouter();

  useShowErrorOfState(state);

  const handleCancelSingIn = () => {
    push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 max-w-7xl mx-auto px-6 lg:px-16 py-10">
      <form
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        action={action}
      >
        {/* Campo de Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>

        {/* Campo de Contraseña */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>

        {/* Botón de Registro */}
        <Button
          disabled={pending}
          variant={"default"}
          type="submit"
          size={"lg"}
          style={{
            width: "100%",
          }}
        >
          {pending ? "Loading..." : "Sign In"}
        </Button>
        <Button
          variant={"destructive"}
          size={"lg"}
          style={{ width: "100%" }}
          onClick={handleCancelSingIn}
        >
          Not Now
        </Button>
        <div className="py-2 text-center">
          <Link className="underline" href="/auth/signup">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
