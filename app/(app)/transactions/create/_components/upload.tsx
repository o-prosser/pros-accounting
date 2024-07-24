"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/components/uploadthing";
import { FileIcon, ImageIcon, XIcon } from "lucide-react";
import { useState } from "react";

const UploadFiles = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState({
    name: "",
    size: 0,
    type: ""
  })

  return (
    <>
      <input type="hidden" value={id} name="fileId" /> 

      {id ? (
        <div className="rounded-lg font-medium text-sm flex px-4 py-2 h-10 items-center border gap-2 mb-6">
          {details.type === 'image' ? (
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <FileIcon className="h-5 w-5 text-muted-foreground"/>
          )}
          <span>{details.name}</span>
          <span className="italic font-normal flex-1">({details.size})</span>
          <Button onClick={() => setId("")} variant="ghost" size={null}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
      <UploadButton
        appearance={{
          container: "",
          button: "w-full bg-background text-foreground border flex text-sm",
          allowedContent: "text-right text-xs text-muted-foreground"
        }}
        content={{
          button: "Upload image of PDF"
        }}
        endpoint="uploader"
        onClientUploadComplete={(res) => {
          setId(res[0].serverData.id);
          setDetails({name: res[0].name, size: res[0].size, type: res[0].type});
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      )}
    </>
  );
}

export default UploadFiles;