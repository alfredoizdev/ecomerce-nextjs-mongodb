"use client";

import { TUser } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
];
