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
import DeleteProduct from "./DeleteProduct";
import { calculateDiscountedPrice } from "@/utils/pricing";
import EditProductButton from "./EditProductButton";

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
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "category",
    header: "Category",
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
  {
    accessorKey: "discountPercentage",
    header: () => <div className="text-center">Discount</div>,
    cell: ({ row }) => {
      const discountedPrice = calculateDiscountedPrice(
        row.getValue("price"),
        row.getValue("discountPercentage")
      );

      const amount = parseFloat(discountedPrice?.toString() || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-center text-red-700">
          {formatted || 0} - {`${row.getValue("discountPercentage")}%`}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const discountedPrice = row.getValue("discountPercentage") !== 0;
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-center font-medium">
          {discountedPrice ? (
            <p className="text-sm text-gray-500 line-through">{formatted}</p>
          ) : (
            formatted
          )}
        </div>
      );
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
            <DropdownMenuItem>
              <EditProductButton id={product.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteProduct product={product} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
