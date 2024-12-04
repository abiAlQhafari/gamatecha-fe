import * as React from "react";

import Dropzone from "shadcn-dropzone";
import { cn } from "../../lib/utils";
import Image from "next/image";

const InputFile = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [previews, setPreviews] = React.useState<string[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    // Membuat preview untuk setiap file
    const newPreviews = acceptedFiles.map((file) => {
      // Membaca file sebagai URL
      return URL.createObjectURL(file);
    });

    setPreviews((prev) => [...prev, ...newPreviews]);

    acceptedFiles.forEach((file) => {
      if (ref && "current" in ref && ref.current) {
        ref.current.value = file.name;
      }
    });
  };

  return (
    <>
      <Dropzone
        containerClassName={cn(
          `border-dashed h-32 border-2 border-gray-300 rounded-md p-4`,
          className
        )}
        showFilesList={true}
        dropZoneClassName="border-none"
        onDrop={handleDrop}
      ></Dropzone>
      <div className="mt-4">
        {previews.map((src, index) => (
          <div key={index} className="relative">
            <Image
              width={100}
              height={100}
              objectFit="cover"
              layout="responsive"
              src={src}
              alt={`Preview ${index + 1}`}
              className="h-full w-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
});
InputFile.displayName = "InputFile";

export { InputFile };
