"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useShowErrorOfState } from "@/hooks/useShowError";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const [state, action, isPending] = useActionState(signUpAction, undefined);
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
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
        </div>
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
          disabled={isPending}
          variant={"default"}
          type="submit"
          size={"lg"}
          style={{
            width: "100%",
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
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
          <Link className="underline" href="/auth/signin">
            I have account Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
