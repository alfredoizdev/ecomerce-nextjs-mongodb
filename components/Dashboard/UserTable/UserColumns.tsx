"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { TUser } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserEditButton from "./UserEditButton";

export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "avatar",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center align-middle">
          <Image
            width={48}
            height={48}
            src={row.getValue("avatar") || "/images/not-profile-image.webp"}
            alt={row.getValue("name")}
            className="w-12 h-12 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return (
        <div className="text-center">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              role === "admin"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {role}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <UserEditButton id={user.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
