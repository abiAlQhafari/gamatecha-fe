"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../components/data-table";
import { fetchCategories } from "../../../services/categories/fetchCategories";
import { columns } from "./column";

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Kategori</h1>
      {isLoading && <span>Loading...</span>}
      <DataTable columns={columns} data={data ? data.data : []} />
    </div>
  );
}
