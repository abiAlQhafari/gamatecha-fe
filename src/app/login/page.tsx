"use client";

import Image from "next/image";
import { LoginForm } from "../../components/login-form";

import logo from "../../../public/assets/images/Horizontal Putih Merah 0-2.png";

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-8 px-4">
      <Image src={logo} alt="Logo" width={400} />
      <LoginForm />
    </div>
  );
}
