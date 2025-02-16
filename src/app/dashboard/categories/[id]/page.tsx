"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchOneCategories } from "../../../../services/categories/fetchOneCategories";
import { SkeletonCard } from "../../../../components/skeleton-card";
import { Article } from "../../../../types/article";
import Link from "next/link";
import { CardDemo } from "../../../../components/article-card";

export default function DetailCategory() {
  const { id } = useParams<{ id: string }>();

  const { data, isError, isFetching } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => fetchOneCategories(id),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detail Category</h1>
      {data && <h3 className="text-xl font-bold mb-4">{data.data.name}</h3>}
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error Occured</span>}

      {/* List of articles */}
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.data?.articles?.length === 0 ? (
          <span>No articles found</span>
        ) : null}
        {data?.data?.articles?.map((article: Article) => (
          <Link key={article.id} href={`/dashboard/articles/${article.slug}`}>
            <CardDemo
              // title={postInstagram.caption}
              description={article.content.slice(0, 100)}
              imageUrl={article.mediaUrl}
              author={{
                name: `${"John Doe"}`,
                avatar: "https://i.pravatar.cc/300",
              }}
              // readTime={"5 min read"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
