import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { createOrUpdateCampsAction } from "@/actions/camp";
import { TCamp } from "@/types/Camp";
import { toast } from "sonner";
import { validationsForCampaing } from "@/utils/validation";

type ErrorItem = {
  i: number;
  key: string;
  message: string;
};

type Erros = ErrorItem[];

const useHandleCamp = (campaings?: TCamp[]) => {
  const [erros, setErros] = useState<Erros>([]);
  const [isPending, setIsPending] = useState(false);

  const validateAndSetErrors = (
    index: number,
    values: { [key: string]: string },
    validations: {
      key: string;
      message: string;
      validate: (value: string) => boolean;
    }[]
  ) => {
    const errorsForIndex: ErrorItem[] = validations
      .filter(({ key, validate }) => !validate(values[key]))
      .map(({ key, message }) => ({
        i: index,
        key,
        message,
      }));

    setErros((prevErrors) => {
      // Filtra los errores antiguos del mismo índice y combina con los nuevos
      const filteredErrors = prevErrors.filter((error) => error.i !== index);
      return [...filteredErrors, ...errorsForIndex];
    });
  };

  const [campaigns, setCampaigns] = useState<TCamp[]>(
    campaings || [
      {
        title: "",
        description: "",
        image: "",
        page: "",
        startDate: "",
        endDate: "",
        color: "",
      },
    ]
  );

  const addCampaignBlock = useCallback(() => {
    if (campaigns.length >= 4) {
      return;
    }

    setCampaigns([
      ...campaigns,
      {
        title: "",
        description: "",
        image: "",
        page: "",
        startDate: "",
        endDate: "",
        color: "",
      },
    ]);
  }, [campaigns]);

  const removeCampaignBlock = useCallback(
    (index: number) => {
      if (campaigns.length <= 1) {
        toast.error("You must have at least one campaign");
        return;
      }

      const updatedCampaigns = [...campaigns];
      updatedCampaigns.splice(index, 1);
      setCampaigns(updatedCampaigns);
    },
    [campaigns]
  );

  const handleCampaignChange = useCallback(
    (
      index: number,
      e:
        | React.ChangeEvent<HTMLInputElement>
        | { target: { name: string; value: string } }
    ) => {
      const { name, value } = e.target;
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[index] = {
        ...updatedCampaigns[index],
        [name]: value,
      };

      validateAndSetErrors(
        index,
        updatedCampaigns[index],
        validationsForCampaing
      );

      setCampaigns(updatedCampaigns);
    },
    [campaigns]
  );

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (campaigns.some((camp) => !camp.title)) {
      toast.error("All campaigns must have a title");
      return;
    }

    if (campaigns.some((camp) => !camp.description)) {
      toast.error("All campaigns must have a description");
      return;
    }

    if (campaigns.some((camp) => !camp.image)) {
      toast.error("All campaigns must have an image");
      return;
    }

    if (campaigns.some((camp) => !camp.page)) {
      toast.error("All campaigns must have a page");
      return;
    }

    setErros([]);

    try {
      setIsPending(true);
      const { success, message } = await createOrUpdateCampsAction(campaigns);

      if (!success) {
        const msg = message || "Something went wrong";
        toast.error(msg);
        return;
      }

      toast.success("Campaigns created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }

    // Aquí puedes enviar los datos al servidor
  };

  const handleImage = (image: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = image?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const updatedCampaigns = [...campaigns];
        updatedCampaigns[index] = {
          ...updatedCampaigns[index],
          image: base64String,
        };
        setCampaigns(updatedCampaigns);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  return {
    campaigns,
    addCampaignBlock,
    handleImage,
    removeCampaignBlock,
    handleCampaignChange,
    handleOnSubmit,
    isPending,
    erros,
  };
};

export default useHandleCamp;
