"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchPostInstagram } from "../../../../../services/post-instagrams/fetchPostInstagram";
import { Input } from "../../../../../components/ui/input";
import { Filter } from "lucide-react";
import Link from "next/link";
import { SkeletonCard } from "../../../../../components/skeleton-card";
import { PostInstagram } from "../../../../../types/post-instagram";
import { CardDemo } from "../../../../../components/article-card";

export default function DetailRiwayatScraping() {
  // const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-instagram", id],
    queryFn: () => fetchPostInstagram(parseInt(id, 10)),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detail Riwayat Scraping</h1>
      {data && (
        <h3 className="text-xl font-bold mb-4">@{data.data.username}</h3>
      )}
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error Occured</span>}

      {/* Search bar */}
      <div className="w-full mb-6 flex justify-between">
        <div className="flex justify-between gap-4">
          <Input
            type="text"
            placeholder="Cari Postingan..."
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
        {data?.data?.postInstagram.map((postInstagram: PostInstagram) => (
          <Link key={postInstagram.id} href={`/articles/${postInstagram.id}`}>
            <CardDemo
              // title={postInstagram.caption}
              description={postInstagram.caption.slice(0, 100)}
              imageUrl={postInstagram.thumbnailUrl}
              author={{ name: "John Doe", avatar: "https://i.pravatar.cc/300" }}
              // readTime={"5 min read"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
