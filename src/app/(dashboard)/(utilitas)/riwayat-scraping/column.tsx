"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { UserInstagram } from "../../../../types/user-instagram";
import * as momentJs from "moment";
import "moment/locale/id";

export const columns: ColumnDef<UserInstagram>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal Terakhir Scraping",
    cell: ({ row }) => {
      const userInstagram = row.original;
      momentJs.locale("id");

      return momentJs
        .default(userInstagram.updatedAt)
        .format("dddd, MMMM Do YYYY");
    },
  },
  {
    accessorKey: "jumlahPostingan",
    header: "Jumlah Postingan",
  },
  {
    accessorKey: "jumlahTelahPublish",
    header: "Jumlah Telah Publish",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const userInstagram = row.original;
      return (
        <Link href={`/riwayat-scraping/${userInstagram.id}`}>
          <Button variant={"secondary"}>
            <Eye />
            View
          </Button>
        </Link>
      );
    },
  },
];
