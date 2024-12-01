"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

type Props = {
  gender?: string;
};

const DropMenuFilter = ({ gender }: Props) => {
  const [value, setValue] = useState(gender || ""); // Default value is "All"
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();
  const { replace } = useRouter();

  const handleGenderSelect = (gender: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("gender", gender);
    setValue(gender);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-end mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {value !== "" ? `By Gender: ${value}` : "Filter by Gender"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => handleGenderSelect("All")}
            className={value === "" ? "bg-gray-200 font-bold" : ""}
          >
            All Genders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("Men")}
            className={value === "Men" ? "bg-gray-200 font-bold" : ""}
          >
            Men
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("Women")}
            className={value === "Women" ? "bg-gray-200 font-bold" : ""}
          >
            Women
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("Unisex")}
            className={value === "Unisex" ? "bg-gray-200 font-bold" : ""}
          >
            Unisex
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropMenuFilter;
