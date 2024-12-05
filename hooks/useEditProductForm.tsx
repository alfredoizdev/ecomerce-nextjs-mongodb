import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@/types/Product";

const useEditProductForm = (
  initialState: Product,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any // Estado del action
) => {
  const [formFields, setFormFields] = useState<Product>(initialState);
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

  // Manejo del estado del action
  useEffect(() => {
    if (state?.success) {
      resetForm();
      toast.success(state.message);
    } else if (state?.message) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.message, state?.success, push]);

  return {
    formFields,
    handleOnChange,
    handleSelectOnChange,
    resetForm,
    setFormFields,
    setImageUrl,
  };
};

export default useEditProductForm;
