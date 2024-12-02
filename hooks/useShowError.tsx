import { useEffect } from "react";
import { toast } from "sonner";

type State =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const useShowErrorOfState = (state: State) => {
  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state?.message]);
};
