"use client";

import { Product } from "@/types/Product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProductAction } from "@/actions/products";
import DeleteProduct from "./DeleteProduct";

export const columns: ColumnDef<Product>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product?.id || "")}
            >
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteProduct product={product} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
