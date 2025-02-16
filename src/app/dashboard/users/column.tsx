"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { User } from "../../../types/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`/dashboard/users/${user.id}`}>
          <Button variant={"secondary"}>
            <Eye />
            View
          </Button>
        </Link>
      );
    },
  },
];
