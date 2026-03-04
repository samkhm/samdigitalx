import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
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

export default function SkillCard({
  skill = [],
  deleteSkill,
  updateSkill,
  deleting,
  updating
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

 

  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };


  useEffect(() => {
    if (open) {
      setTitle(skill.title || "");
      setImageFile(null);
      setPreviewUrl(skill.image || null);
    }
  }, [open, skill]);

  useEffect(() => {
    return () => {
      if (imageFile && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile, previewUrl]);

  

  const handleSubmit = async () => {
    if (!title.trim()) return;

    
    await updateSkill(skill._id, { title, imageFile });
   
  };

  return (
    <Card className="relative animation-fade ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{skill.title}</CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2 flex-wrap">
        <Button onClick={() => deleteSkill(skill._id)} disabled={deleting}>
          {deleting === skill._id ? (
            <FaSpinner color="red" height={5} width={5} />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6">
            <DialogHeader>
              <DialogTitle>Update Skill</DialogTitle>
              <DialogDescription>
                Update skill for your portfolio.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
                <Input
                ref={fileInputRef}
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
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {
                  updating ? <FaSpinner h={5} w={5} color="white"/> : "Update"
                }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
