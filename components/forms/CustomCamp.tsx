"use client";
import { Button } from "../ui/button";
import { MdAdd } from "react-icons/md";
import { Input } from "../ui/input";
import { TCamp } from "@/types/Camp";
import ColorPickerField from "../Dashboard/ColorPickerField";
import { Label } from "../ui/label";
import Image from "next/image";
import useHandleCamp from "@/hooks/useHandleCamp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MENU } from "@/constants/menu";
import { Loader2 } from "lucide-react";

type Props = {
  campaings?: TCamp[];
};

const CustomCamp = ({ campaings }: Props) => {
  const {
    addCampaignBlock,
    removeCampaignBlock,
    handleCampaignChange,
    handleOnSubmit,
    handleImage,
    campaigns,
    isPending,
    erros,
  } = useHandleCamp(campaings);

  return (
    <section>
      {/* Botón para agregar un nuevo bloque de campos */}
      <div className="flex justify-end items-center my-5">
        <Button
          disabled={campaigns.length === 4}
          onClick={addCampaignBlock}
          variant="secondary"
        >
          <MdAdd size={24} />
          Add Campaign
        </Button>
      </div>
      <hr className="bg-gray-500 mb-8" />

      {/* Formulario principal */}
      <form onSubmit={handleOnSubmit}>
        {campaigns.map((campaign, index) => (
          <div key={index} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`title${index}`}
                  >
                    Campaign Title # {index + 1}
                  </Label>
                  <Input
                    onChange={(e) => handleCampaignChange(index, e)}
                    value={campaign.title}
                    type="text"
                    id={`title${index}`}
                    name="title"
                  />
                  {erros.find(
                    (error) => error.i === index && error.key === "title"
                  ) && (
                    <p className="text-sm text-red-500 mt-1">
                      {
                        erros.find(
                          (error) => error.i === index && error.key === "title"
                        )?.message
                      }
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`description${index}`}
                  >
                    Campaign Description # {index + 1}
                  </Label>
                  <Input
                    onChange={(e) => handleCampaignChange(index, e)}
                    value={campaign.description}
                    type="text"
                    id={`description${index}`}
                    name="description"
                  />
                  {erros.find(
                    (error) => error.i === index && error.key === "description"
                  ) && (
                    <p className="text-sm text-red-500 mt-1">
                      {
                        erros.find(
                          (error) =>
                            error.i === index && error.key === "description"
                        )?.message
                      }
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`page${index}`}
                  >
                    Campaign Link # {index + 1}
                  </Label>
                  <Select
                    name="page"
                    value={campaign.page}
                    onValueChange={(value) =>
                      handleCampaignChange(index, {
                        target: { name: "page", value },
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {MENU.map((page) => (
                        <SelectItem key={page.id} value={page.link}>
                          {page.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {erros.find(
                    (error) => error.i === index && error.key === "page"
                  ) && (
                    <p className="text-sm text-red-500 mt-1">
                      {
                        erros.find(
                          (error) => error.i === index && error.key === "page"
                        )?.message
                      }
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`startDate${index}`}
                  >
                    Start Date # {index + 1}
                  </Label>
                  <Input
                    onChange={(e) => handleCampaignChange(index, e)}
                    value={campaign.startDate}
                    type="date"
                    id={`startDate${index}`}
                    name="startDate"
                  />
                </div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`endDate${index}`}
                  >
                    End Date # {index + 1}
                  </Label>
                  <Input
                    onChange={(e) => handleCampaignChange(index, e)}
                    value={campaign.endDate}
                    type="date"
                    id={`endDate${index}`}
                    name="endDate"
                  />
                </div>
                <div className="mb-3">
                  <Label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={`color${index}`}
                  >
                    Color # {index + 1}
                  </Label>
                  <input
                    hidden
                    type="text"
                    id={`color${index}`}
                    value={campaign.color || "#000000"}
                    name="color"
                    onChange={(e) => handleCampaignChange(index, e)}
                  />
                  <ColorPickerField
                    color={campaign.color || "#000000"}
                    onChange={(newColor) =>
                      handleCampaignChange(index, {
                        target: { name: "color", value: newColor },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <Label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor={`image${index}`}
                >
                  Image # {index + 1}
                </Label>
                <div className="m-5 max-w-sm">
                  <Image
                    src={campaign.image || "/images/not-image.webp"}
                    alt={`Image ${index + 1}`}
                    width={400}
                    height={400}
                    className="rounded-md"
                  />
                </div>
                <Input
                  className="max-w-sm"
                  onChange={(e) => handleImage(e, index)}
                  type="file"
                  id={`image${index}`}
                  name="image"
                />
              </div>
            </div>
            <input
              value={campaign.publicImageId}
              type="hidden"
              name="publicImageId"
            />

            <input type="hidden" name="campid" value={campaign.id} />
            {/* Botón para eliminar el bloque de campos */}
            <div className="flex justify-end mt-4">
              <Button
                disabled={isPending}
                onClick={() => removeCampaignBlock(index)}
                variant="destructive"
                type="button"
              >
                Remove Campaign # {index + 1}
              </Button>
            </div>
            <hr className="bg-gray-500 mt-8" />
          </div>
        ))}
        {/* Botón de envío del formulario */}
        <div className="flex justify-end flex-col mt-6 md:flex-row">
          <Button
            className="mb-3 md:mr-4"
            disabled={campaigns.length === 4}
            onClick={addCampaignBlock}
            variant="secondary"
          >
            <MdAdd size={24} />
            Add Campaign
          </Button>
          <Button disabled={isPending} variant="default" type="submit">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <span>Submit All Campaigns</span>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CustomCamp;
