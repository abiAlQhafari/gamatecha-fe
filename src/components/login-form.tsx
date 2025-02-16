"use client";

import { ThemeProvider } from "./theme-provider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import { authSchema } from "../schemas/auth";
import { login } from "../services/auth";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./ui/loading-button";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof authSchema>) => {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        redirectTo: "/dashboard",
      });

      if (res?.error) {
        alert(JSON.stringify(res));
      } else {
        window.location.href = res?.url || "/dashboard";
      }
    },
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    mutate(values);
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton className="mt-6" loading={isPending} type="submit">
                Login
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
