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
import { X } from "lucide-react";
import { FaAd, FaSpinner } from "react-icons/fa";

export default function ProjectDialog({ onSubmit, creating }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGitLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
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
    setDescription("");
    setGitLink("");
    setLiveLink("");
    setImageFile(null);
    setPreviewUrl(null);
    setShowBigPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required");
      return;
    }

    onSubmit({ title, description, githubLink, liveLink, imageFile });
    resetForm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center border-2 border-blue-500 rounded-full p-2
                       hover:border-green-500 transition-colors shadow-md"
        >
          <FaAd className="text-3xl text-blue-500 hover:text-green-500 transition-colors" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            New Project
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-gray-600 dark:text-gray-300">
          Create a new project for your portfolio.
        </DialogDescription>

        <div className="space-y-3 mt-4">
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

          <Input
            placeholder="Github Link"
            value={githubLink}
            onChange={(e) => setGitLink(e.target.value)}
          />

          <Input
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-6 flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={creating}
          >
            {creating ? <FaSpinner /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
