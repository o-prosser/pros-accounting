"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/components/uploadthing";
import { SelectFile } from "@/drizzle/schema";
import { formatSize } from "@/utils/files";
import { FileIcon, ImageIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const UploadFiles = ({ file }: { file?: SelectFile | null }) => {
  const [id, setId] = useState(file?.id || "");
  const [details, setDetails] = useState({
    name: file?.name || "",
    size: file?.size ? parseInt(file.size) : 0,
    type: file?.type || "",
  });

  return (
    <>
      <input type="hidden" value={id} name="fileId" />

      {id ? (
        <div className="rounded-lg font-medium text-sm flex px-4 py-2 h-10 items-center border gap-2 mb-6">
          {details.type === "image" ? (
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <FileIcon className="h-5 w-5 text-muted-foreground" />
          )}
          <span>{details.name}</span>
          <span className="italic font-normal flex-1">
            ({formatSize(details.size)})
          </span>
          <Button
            onClick={() => setId("")}
            variant="ghost"
            size={null}
            className="justify-start"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <UploadButton
          className="ut-button:w-full ut-button:bg-background ut-button:text-foreground ut-button:border ut-button:flex ut-button:text-sm ut-button:justify-start ut-button:px-4 ut-button:hover:bg-accent ut-button:hover:text-accent-foreground ut-button:transition-colors ut-allowed-content:hidden"
          config={{ cn: twMerge }}
          content={{
            button: (
              <>
                <FileIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Upload an image of PDF</span>
              </>
            ),
          }}
          endpoint="uploader"
          onClientUploadComplete={(res) => {
            setId(res[0].serverData.id);
            setDetails({
              name: res[0].name,
              size: res[0].size,
              type: res[0].type,
            });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </>
  );
};

export default UploadFiles;
