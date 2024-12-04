"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Category } from "../../../types/category";

export const columns: ColumnDef<Category>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const kategori = row.original;
      return (
        <Link href={`/categories/${kategori.id}`}>
          <Button variant={"secondary"}>
            <Eye />
            View
          </Button>
        </Link>
      );
    },
  },
];
