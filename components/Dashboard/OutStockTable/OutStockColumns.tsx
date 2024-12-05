"use client";

import { Product } from "@/types/Product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const outStockcolumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center align-middle">
          <Image
            width={48}
            height={48}
            src={row.getValue("image")}
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "inStock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => {
      const inStock = row.getValue("inStock") as string;

      return (
        <div className="text-center">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              inStock === "in"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {inStock}
          </span>
        </div>
      );
    },
  },
];
