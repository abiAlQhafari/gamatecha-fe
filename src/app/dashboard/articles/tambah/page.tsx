import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ArticleForm } from "../../../../components/article-form";

export default function TambahArticle() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Tambah Artikel</h1>

      <Link href="#">
        <Button variant={"secondary"}>Ambil Dari Instagram</Button>
      </Link>

      <div className="py-4 ">
        <ArticleForm />
      </div>
    </div>
  );
}
