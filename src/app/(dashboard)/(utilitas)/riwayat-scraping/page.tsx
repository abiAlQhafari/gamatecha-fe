"use client";

import { columns } from "./column";
import { DataTable } from "../../../../components/data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInstagram } from "../../../../services/user-instagrams/fetchUserInstagram";

export default function DashboardArticles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-instagram"],
    queryFn: fetchUserInstagram,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Riwayat Scraping</h1>
      {isLoading && <span>Loading...</span>}
      <DataTable columns={columns} data={data ? data.data : []} />
    </div>
  );
}
