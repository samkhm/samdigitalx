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
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function ServiceDialog({ onSubmit, creating }) {
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showBigPreview, setShowBigPreview] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setShort("");
    setDescription("");
    setImageFile(null);
    setPreviewUrl(null);
    setShowBigPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onSubmit({ title, short, description, imageFile });
    resetForm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:from-emerald-600 hover:to-teal-600">
          Add Service
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            New Service
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-gray-600 dark:text-gray-300">
          Create a new service for your portfolio.
        </DialogDescription>

        <div className="space-y-3 mt-4">
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            placeholder="Enter Short Description"
            value={short}
            onChange={(e) => setShort(e.target.value)}
            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <textarea
            rows={2}
            cols={50}
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full"
          />

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {imageFile && previewUrl && (
            <div className="relative inline-block mt-2 group">
              <p
                onClick={() => setShowBigPreview(true)}
                className="text-sm text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer underline"
              >
                {imageFile.name} (hover to preview / click to enlarge)
              </p>
              <div className="absolute left-0 mt-1 hidden group-hover:block z-10">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-lg"
                />
              </div>
            </div>
          )}

          {showBigPreview && previewUrl && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-lg">
                <button
                  onClick={() => setShowBigPreview(false)}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black/90"
                >
                  <X size={16} />
                </button>
                <img
                  src={previewUrl}
                  alt="Large Preview"
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
          disabled={creating}
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {
              creating ? "Creating..." : "Create"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
