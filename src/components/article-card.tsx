"use client";

import Image from "next/image";
import { cn } from "../lib/utils";
import { ArticleStatus } from "../app/enum/article-status.enum";

interface CardDemoProps {
  className?: string;
  title?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  author: {
    name: string;
    avatar: string;
  };
  status?: ArticleStatus;
  readTime?: string;
}

export function CardDemo({
  className,
  title,
  description,
  imageUrl,
  author,
  readTime,
  status,
}: CardDemoProps) {
  return (
    <div className={cn("max-w-full w-full group/card", className)}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-full mx-auto flex flex-col justify-between p-4",
          `bg-cover`
        )}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row w-full justify-between z-10">
          <div className="flex flex-row items-center space-x-4 ">
            <Image
              height="100"
              width="100"
              alt="Avatar"
              src={author.avatar}
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-normal text-base text-gray-50 relative z-10">
                {author.name}
              </p>
              <p className="text-sm text-gray-400">{readTime}</p>
            </div>
          </div>
          <div>
            <span
              className={`text-white ${
                status === ArticleStatus.ARCHIVED
                  ? "bg-amber-500"
                  : "bg-green-500"
              } rounded-full px-2 py-1`}
            >
              {status}
            </span>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <p
            dangerouslySetInnerHTML={{ __html: description || "" }}
            className="font-normal text-sm text-gray-50 relative z-10 my-4"
          ></p>
        </div>
      </div>
    </div>
  );
}
