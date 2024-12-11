import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMediaStore } from "@/store/useMediaStore";

interface FormState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Permite manejar múltiples formularios genéricos
}

const useFormHandler = (
  initialState: FormState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  options: {
    onSuccessRedirect?: string; // Ruta a la que redirigir después del éxito
    onSuccessMessage?: string; // Mensaje de éxito
    onErrorMessage?: string; // Mensaje de error
  } = {}
) => {
  const { currentMedia } = useMediaStore((state) => state);
  const [formFields, setFormFields] = useState<FormState>(initialState);
  const [publicImageId, setPublicImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { push } = useRouter();

  // Manejo de cambios en los inputs
  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOnChange = (value: string, key: string) => {
    setFormFields((prevFields) => ({ ...prevFields, [key]: value }));
  };

  const handleSizesChange = (sizes: string[]) => {
    setFormFields((prevFields) => ({ ...prevFields, sizes: sizes.join(",") }));
  };

  const handleColorChange = (colors: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      colors: colors.join(","),
    }));
  };

  const resetForm = () => setFormFields(initialState);

  // Manejo de imagen
  useEffect(() => {
    if (imageUrl) {
      setFormFields((prevFields) => ({
        ...prevFields,
        image: imageUrl,
      }));
    }
  }, [imageUrl]);

  useEffect(() => {
    if (publicImageId) {
      setFormFields((prevFields) => ({
        ...prevFields,
        publicImageId,
      }));
    }
  }, [publicImageId]);

  useEffect(() => {
    if (currentMedia) {
      setImageUrl(currentMedia.secure_url);
      setPublicImageId(currentMedia.public_id);
    }
  }, [currentMedia]);

  // Manejo del estado del action (éxito o error)
  useEffect(() => {
    if (state?.success) {
      resetForm();
      toast.success(options.onSuccessMessage || state.message);
      if (options.onSuccessRedirect) {
        push(options.onSuccessRedirect);
      }
    } else if (state?.message) {
      toast.error(options.onErrorMessage || state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    formFields,
    handleOnChange,
    handleSelectOnChange,
    resetForm,
    setFormFields,
    setImageUrl,
    handleColorChange,
    handleSizesChange,
    setPublicImageId,
  };
};

export default useFormHandler;
