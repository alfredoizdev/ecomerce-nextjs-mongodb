import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMediaStore } from "@/store/useMediaStore";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  discountPercentage: number;
  material: string;
  sole: string;
  weight: string;
  colors: string;
  sizes: string;
  image?: string;
  inStock: string;
  publicImageId?: string;
}

const useCreateProductForm = (
  initialState: ProductFormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any // Estado del action
) => {
  const { currentMedia } = useMediaStore((state) => state);
  const [formFields, setFormFields] = useState<ProductFormData>(initialState);
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
      push("/admin/products");
    } else if (state?.message) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.message, state?.success, push]);

  useEffect(() => {
    if (publicImageId) {
      setFormFields((prev) => ({ ...prev, publicImageId }));
    }
  }, [publicImageId]);

  useEffect(() => {
    if (currentMedia) {
      setImageUrl(currentMedia.secure_url);
      setPublicImageId(currentMedia.public_id);
    }
  }, [currentMedia]);

  return {
    formFields,
    handleOnChange,
    handleSelectOnChange,
    resetForm,
    setFormFields,
    setImageUrl,
    setPublicImageId,
  };
};

export default useCreateProductForm;
