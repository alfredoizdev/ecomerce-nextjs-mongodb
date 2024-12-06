import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type InputForm = {
  name: string;
  email: string;
  password: string;
  image: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHandleUser = (state: any) => {
  const { push } = useRouter();
  const [formState, setFormState] = useState<InputForm>({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
      push("/admin/users");
    } else {
      toast.error(state?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { formState, handleOnChange, imageUrl, setImageUrl, push };
};

export default useHandleUser;
