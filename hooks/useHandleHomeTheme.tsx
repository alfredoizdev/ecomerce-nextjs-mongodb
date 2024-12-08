import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormState {
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
  footerColorTitle: string;
  footerBackgroundColor: string;
  footerColorText: string;
  navbarColor: string;
  navbarTextColor: string;
  publicImageId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHandleHomeTheme = (state?: any, initialState?: FormState) => {
  const [publicImageId, setPublicImageId] = useState("");
  const [formState, setFormState] = useState<FormState>({
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
    footerColorTitle: initialState?.footerColorTitle || "",
    footerBackgroundColor: initialState?.footerBackgroundColor || "",
    footerColorText: initialState?.footerColorText || "",
    navbarColor: initialState?.navbarColor || "",
    navbarTextColor: initialState?.navbarTextColor || "",
    publicImageId: initialState?.publicImageId || "",
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

  useEffect(() => {
    if (publicImageId) {
      setFormState((prev) => ({ ...prev, publicImageId }));
    }
  }, [publicImageId]);

  return {
    formState,
    handleOnChange,
    imageUrl,
    setImageUrl,
    push,
    setPublicImageId,
  };
};

export default useHandleHomeTheme;
