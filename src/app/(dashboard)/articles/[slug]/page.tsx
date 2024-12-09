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
import { useEffect, useState } from "react";
import { LoadingButton } from "../../../../components/ui/loading-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOneArticles } from "../../../../services/articles/fetchOneArticles";
import { Form } from "../../../../components/ui/form";
import ContentRenderer from "../../../../components/content-renderer";
import { SkeletonCard } from "../../../../components/skeleton-card";
import { updateArticle } from "../../../../services/articles/updateArticle";
import { toast } from "sonner";

export default function DetailArticle() {
  const router = useRouter();
  const params = useParams<{ tag: string; slug: string }>();
  const { slug } = params;

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["articles", slug],
    queryFn: () => fetchOneArticles(slug),
  });

  const form = useForm<Partial<z.infer<typeof articleSchema>>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: data ? data.data.title : "",
      content: data ? data.data.content : "",
      mediaUrl: data ? data.data.mediaUrl : "",
      categories: data ? [data.data.categories] : [],
      status: data?.data?.status === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["articles", data?.data.id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<z.infer<typeof articleSchema>>;
    }) => updateArticle(id, data),
    onSuccess: () => {
      setIsSuccess(true);
      toast("Article Published", { duration: 2000 });
      router.push("/articles");
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      toast("Gagal Membuat Article", {
        duration: 2000,
      });
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title,
        content: data.data.content,
        mediaUrl: data.data.mediaUrl,
        categories: data.data.categories || [],
        status: data.data.status === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED",
      });
    }
  }, [data, form]);

  if (isError) {
    return <span>Error Accorded</span>;
  }

  function onSubmit(values: Partial<z.infer<typeof articleSchema>>) {
    console.log("Form values:", values);
    if (!data?.data.id) {
      console.error("Article ID not found!");
      return;
    }
    mutate({ id: data.data.id, data: values });
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

            <div className="w-3/4 h-full">
              {isLoading ? (
                <SkeletonCard />
              ) : (
                <Card
                  style={{
                    backgroundImage: `url(${data?.data?.mediaUrl})`,
                  }}
                  className={`bg-cover bg-center h-2/5 flex flex-col justify-end`}
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
              )}

              <article className="prose prose-lg sm:prose-xl max-w-none py-6 space-y-6">
                {data?.data?.content ? (
                  <ContentRenderer content={data?.data?.content} />
                ) : (
                  <></>
                )}
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
                      <input type="hidden" {...form.register("status")} />
                      <input type="hidden" {...form.register("title")} />
                      <input type="hidden" {...form.register("content")} />
                      <input type="hidden" {...form.register("mediaUrl")} />
                      <input type="hidden" {...form.register("categories")} />
                      <LoadingButton
                        className="bg-green-500 rounded-sm text-white"
                        loading={loading}
                        onClick={() => {
                          console.log(form.getValues());
                          form.handleSubmit(onSubmit)();
                        }}
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
