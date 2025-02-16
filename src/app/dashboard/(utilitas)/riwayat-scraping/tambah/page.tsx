"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../../components/ui/form";
import { userInstagramSchema } from "../../../../../schemas/userInstagram";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/ui/input";
import { LoadingButton } from "../../../../../components/ui/loading-button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createUserInstagram } from "../../../../../services/user-instagrams/createUserInstagram";
import { Dialog, DialogContent } from "../../../../../components/ui/dialog";
import { Spinner } from "../../../../../components/ui/spinner";
import { useRouter } from "next/navigation";

export default function TambahRiwayatScraping() {
  const router = useRouter();

  const form = useForm<z.infer<typeof userInstagramSchema>>({
    resolver: zodResolver(userInstagramSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUserInstagram,
    onSuccess: () => {
      toast("Berhasil Scraping User", { duration: 2000 });
      router.push("/dashboard/riwayat-scraping");
    },
    onError: () => {
      toast("Gagal Scraping User", {
        duration: 2000,
        className: "bg-red-500 text-white",
      });
    },
  });

  function onSubmit(values: z.infer<typeof userInstagramSchema>) {
    mutate(values);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Riwayat Scraping</h1>

      <div className="py-4">
        <Form {...form}>
          <form
            className="flex flex-col w-1/2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username Instagram</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white border-none"
                      placeholder="@gamatecha"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <LoadingButton
              variant={"secondary"}
              loading={isPending}
              type="submit"
            >
              Scrape
            </LoadingButton>
          </form>
        </Form>

        {isPending ? (
          <Dialog open={isPending}>
            <DialogContent className="flex gap-4 items-center">
              <Spinner size={"large"} />
              <span>Sedang Scraping</span>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </div>
  );
}
