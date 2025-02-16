"use client";

import { ChevronDown, Filter } from "lucide-react";
import { CardDemo } from "../../../components/article-card";
import { Input } from "../../../components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../../services/articles/fetchArticles";
import { Article } from "../../../types/article";
import { SkeletonCard } from "../../../components/skeleton-card";

export default function DashboardArticles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Artikel</h1>

      {/* Search bar */}
      <div className="w-full mb-6 flex justify-between">
        <div className="flex justify-between gap-4">
          <Input
            type="text"
            placeholder="Cari artikel..."
            className="bg-white border-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          ></Input>
          <div className="bg-white flex rounded-md items-center">
            <Input
              type="text"
              placeholder="Filter"
              className="bg-transparent border-none"
            ></Input>
            <Filter color="text-muted-foreground" size={24} />
          </div>
        </div>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center bg-secondary text-white rounded-md px-3 py-2">
              <span className="bg-transparent">Tambah Artikel</span>
              <ChevronDown size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={"/dashboard/articles/tambah"}>Manual</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/dashboard/riwayat-scraping/tambah"}>
                    Otomatis
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* List of articles */}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.data?.length === 0 ? <span>No articles found</span> : null}
        {data?.data?.map((article: Article) => (
          <Link key={article.slug} href={`/dashboard/articles/${article.slug}`}>
            <CardDemo
              title={`${article.title.slice(0, 50)}...`}
              description={`${article.content.slice(0, 100)}...`}
              imageUrl={article.mediaUrl}
              author={{ name: "John Doe", avatar: "https://i.pravatar.cc/300" }}
              readTime={"5 min read"}
              status={article.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
