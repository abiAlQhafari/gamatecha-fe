"use client";

import { ArrowUpToLine, CheckCircle2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { FaCircle } from "react-icons/fa";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

import { useForm } from "react-hook-form";
import { articleSchema } from "../../../../schemas/article";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { LoadingButton } from "../../../../components/ui/loading-button";
import { useQuery } from "@tanstack/react-query";
import { fetchOneArticles } from "../../../../services/articles/fetchOneArticles";
import { Form } from "../../../../components/ui/form";

export default function DetailArticle() {
  const router = useRouter();
  const params = useParams<{ tag: string; slug: string }>();
  const { slug } = params;

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, isError } = useQuery({
    queryKey: ["articles", slug],
    queryFn: () => fetchOneArticles(slug),
  });

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: data ? data.data.title : "Test",
      content: data ? data.data.content : "",
      mediaUrl: data ? data.data.mediaUrl : "",
      categories: data ? [data.data.categories] : [],
    },
  });

  if (isError) {
    return <span>Error Accorded</span>;
  }

  function onSubmit(values: z.infer<typeof articleSchema>) {
    console.log(values);

    setLoading(true);

    setTimeout(() => {
      console.log(values);
      setLoading(false);
      setIsSuccess(true);
    }, 3000);

    setTimeout(() => {
      router.push("/articles");
    }, 3000);
  }

  return (
    <>
      {isError ? (
        <span>Server Error</span>
      ) : (
        <Dialog>
          <div className="h-dvh flex flex-col items-center gap-8">
            <div className="w-full  flex justify-between ">
              <h1 className="text-2xl font-bold mb-4">Preview</h1>
              <div className="flex gap-4">
                <DialogTrigger asChild>
                  <Button
                    variant={"secondary"}
                    className="bg-green-500 text-white"
                  >
                    <ArrowUpToLine size={24} />
                    Publikasikan
                  </Button>
                </DialogTrigger>
                <Button variant="secondary">Simpan</Button>
              </div>
            </div>

            <div className="w-3/4">
              <Card
                style={{
                  backgroundImage: `url(${data?.data?.mediaUrl})`,
                }}
                className={`bg-cover bg-center h-3/4 flex flex-col justify-end`}
              >
                <div className="flex flex-col justify-between backdrop-blur h-2/5 p-2 sm:p-4">
                  <CardHeader className="p-0">
                    <div className="flex gap-3">
                      {data?.data?.categories
                        ? data?.data?.categories.map((category: string) => (
                            <span
                              key={category}
                              className="text-violet-600 text-sm bg-white/75 rounded-full px-1 py sm:px-2 sm:py-1"
                            >
                              <FaCircle className="h-4 w-4 inline-block mr-2" />
                              {category}
                            </span>
                          ))
                        : []}
                    </div>
                  </CardHeader>
                  <CardTitle className="flex-1 text-xl sm:text-3xl">
                    {data?.data?.title}
                  </CardTitle>
                  <CardFooter className="p-0 flex-1">
                    <div>
                      <span className="text-white">
                        {data?.data?.publishedAt
                          ? data?.data?.publishedAt
                          : "19 Oktober 2024"}
                      </span>
                    </div>
                  </CardFooter>
                </div>
              </Card>

              <article className="prose prose-lg sm:prose-xl max-w-none py-6 space-y-6">
                {data?.data?.content
                  .split("\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </article>
            </div>
          </div>
          <DialogContent className="sm:max-w-md">
            {isSuccess ? (
              <>
                <div className="flex flex-col justify-center items-center gap-4">
                  <CheckCircle2 color="#22bb33" size={200}></CheckCircle2>
                  <h2>Artikel Berhasil diterbitkan</h2>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>
                    Anda Yakin Ingin Menerbitkan Artikel Ini?
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <LoadingButton
                        className="bg-green-500 rounded-sm text-white"
                        loading={loading}
                        type="submit"
                      >
                        Yakin
                      </LoadingButton>
                    </form>
                  </Form>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Tutup
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
