import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormState {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  backgroundBtn: string;
  textBtn: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBannerImage: string;
  heroColorTitle: string;
  heroColorSubtitle: string;
  cardColor: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHandleHomeTheme = (state?: any, initialState?: FormState) => {
  const [formState, setFormState] = useState<FormState>({
    primary: initialState?.primary || "",
    secondary: initialState?.secondary || "",
    background: initialState?.background || "",
    text: initialState?.text || "",
    backgroundBtn: initialState?.backgroundBtn || "",
    textBtn: initialState?.textBtn || "",
    heroTitle: initialState?.heroTitle || "",
    heroSubtitle: initialState?.heroSubtitle || "",
    heroBannerImage: initialState?.heroBannerImage || "",
    heroColorTitle: initialState?.heroColorTitle || "",
    heroColorSubtitle: initialState?.heroColorSubtitle || "",
    cardColor: initialState?.cardColor || "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const push = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Theme updated successfully");
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  // Manejo de imagen
  useEffect(() => {
    if (imageUrl) {
      setFormState((prevFields) => ({
        ...prevFields,
        heroBannerImage: imageUrl,
      }));
    }
  }, [imageUrl]);

  return { formState, handleOnChange, imageUrl, setImageUrl, push };
};

export default useHandleHomeTheme;
