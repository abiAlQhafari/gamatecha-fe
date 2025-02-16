"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { articleSchema } from "../schemas/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { InputFile } from "./ui/input-file";
import { RichTextEditor } from "./rich-text-editor";
import { Button } from "./ui/button";
import { Archive, CheckCircle2, Eye, X } from "lucide-react";
import { TagInput } from "./ui/tag-input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createArticle } from "../services/articles/createArticle";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LoadingButton } from "./ui/loading-button";

export function ArticleForm() {
  const router = useRouter();
  const [tags, setTags] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      mediaUrl: "",
      categories: [],
    },
  });
  const { setValue } = form;

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      toast("Create Article successful", { duration: 2000 });
      router.push("/dashboard/articles");
    },
    onError: () => {
      toast("Gagal Membuat Article", {
        duration: 2000,
        className: "text-red-500",
        icon: <X className="w-6 h-6" />,
      });
    },
  });

  function onSubmit(values: z.infer<typeof articleSchema>) {
    mutate(values);
  }

  return (
    <div>
      <Dialog>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white border-none"
                      placeholder="Contoh: Revolusi AI dalam Dunia Teknologi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mediaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <FormControl>
                    <InputFile value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Contoh: Revolusi AI dalam Dunia Teknologi"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl className="bg-white">
                    <TagInput
                      {...field}
                      placeholder="Masukkan Kategori"
                      tags={tags}
                      className="sm:min-w-[450px] border-none"
                      setTags={(newTags) => {
                        setTags(newTags);
                        setValue(
                          "categories",
                          newTags as [string, ...string[]]
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-4">
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="w-full bg-green-500 text-white"
                >
                  <Eye />
                  Preview
                </Button>
              </DialogTrigger>
              <Button
                variant={"ghost"}
                className="w-full bg-white"
                type="submit"
              >
                <Archive />
                Draft
              </Button>
            </div>
            <DialogContent className="sm:max-w-md">
              {isSuccess ? (
                <>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <CheckCircle2 color="#22bb33" size={200}></CheckCircle2>
                    <h2>Artikel Dimasukkan ke Draft</h2>
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
                    <LoadingButton
                      onClick={form.handleSubmit(onSubmit)}
                      className="bg-green-500 rounded-sm text-white"
                      loading={isPending}
                      type="submit"
                    >
                      Yakin
                    </LoadingButton>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Tutup
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </div>
  );
}
