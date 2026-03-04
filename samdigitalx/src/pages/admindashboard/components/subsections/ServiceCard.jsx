import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";
import { useRef } from "react";

export default function ServiceCard({
  service = {},
  deleteService,
  updateService,
  deleting,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
 

  const fileInputRef = useRef(null);

  const [updating, setUpdating] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  useEffect(() => {
    if (open) {
      setTitle(service.title || "");
      setShort(service.short || "");
      setDescription(service.description || "");
      setImageFile(null);
      setPreviewUrl(service.image || null);
    }
  }, [open, service]);

  useEffect(() => {
    return () => {
      if (imageFile && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile, previewUrl]);

  // // When dialog opens, sync title and preview
  // useEffect(() => {
  //   if (open) {
  //     setTitle(service.title || "");
  //     setImageFile(null);
  //     setPreviewUrl(service.image || null);
  //   }
  // }, [open, service]);

  // Cleanup object URL when file changes
  // useEffect(() => {
  //   return () => {
  //     if (previewUrl && imageFile) {
  //       URL.revokeObjectURL(previewUrl);
  //     }
  //   };
  // }, [previewUrl, imageFile]);
  // Sync title when dialog opens or service changes
  // useEffect(() => {
  //   if (open) {
  //     setTitle(service.title || "");
  //     setImageFile(null);
  //   }
  // }, [open, service]);

  // Generate preview


  const handleSubmit = async () => {
    if (!title.trim()) return;

    setUpdating(true);
    await updateService(service._id, { title, short, description, imageFile });
    setUpdating(false);
    
  };

  return (
    <Card className="relative animation-fade">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2 flex-wrap">
        {/* DELETE */}
        <Button
          onClick={() => deleteService(service._id)}
          disabled={deleting === service._id}
        >
          {deleting === service._id ? (
            <FaSpinner className="animate-spin text-red-500" />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </Button>

        {/* UPDATE */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6">
            <DialogHeader>
              <DialogTitle>Update Service</DialogTitle>
              <DialogDescription>
                Modify service title or image.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />

              <Input
                value={short}
                onChange={(e) => setShort(e.target.value)}
                placeholder="Enter Short Description"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"                
                rows={2}
                cols={50}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {previewUrl && (
                <div className="relative inline-block mt-3 group">
                  {/* Link */}
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer underline">
                    Hover to preview image
                  </p>

                  {/* Hover Preview Box */}
                  <div className="absolute left-0 mt-2 hidden group-hover:block z-50">
                    <img
                      src={previewUrl}
                      alt="hover-preview"
                      className="w-64 h-64 object-contain rounded-xl border shadow-2xl bg-white p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button
                onClick={handleSubmit}
                disabled={updating}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {updating ? <FaSpinner className="animate-spin" /> : "Update"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
