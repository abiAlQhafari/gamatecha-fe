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
import { Archive, Eye } from "lucide-react";
import { TagInput } from "./ui/tag-input";
import { toast } from "sonner";

export function ArticleForm() {
  const [tags, setTags] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "http://example.com",
      categories: [],
    },
  });
  const { setValue } = form;

  function onSubmit(values: z.infer<typeof articleSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover</FormLabel>
                <FormControl>
                  <InputFile {...field} />
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
                      setValue("categories", newTags as [string, ...string[]]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-4">
            <Button
              variant={"ghost"}
              className="w-full bg-green-500 text-white"
              type="submit"
            >
              <Eye />
              Preview
            </Button>
            <Button variant={"ghost"} className="w-full bg-white" type="submit">
              <Archive />
              Draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
