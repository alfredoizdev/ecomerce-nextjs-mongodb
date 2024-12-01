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
    replace(`${pathname}?${params.toString().toLocaleLowerCase()}`);
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
            onClick={() => handleGenderSelect("all")}
            className={value === "all" ? "bg-gray-200 font-bold" : ""}
          >
            All Genders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("man")}
            className={value === "man" ? "bg-gray-200 font-bold" : ""}
          >
            Man
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("woman")}
            className={value === "women" ? "bg-gray-200 font-bold" : ""}
          >
            Women
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleGenderSelect("unisex")}
            className={value === "unisex" ? "bg-gray-200 font-bold" : ""}
          >
            Unisex
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropMenuFilter;
