import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { X } from "lucide-react";
import { toast } from "sonner";
import API from "@/service/api";

export default function ProjectItem({
  project,
  deleteProject,
  updateProject,
  toggleCompleted,
  loadUpdate,
  deleting,
}) {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [githubLink, setGitLink] = useState(project?.githubLink || "");
  const [liveLink, setLiveLink] = useState(project?.liveLink || "");
  const [imageFile, setImageFile] = useState(null);

  // Only initialize once
  const [languages, setLanguages] = useState(project?.tech || []);
  const [newLang, setNewLang] = useState("");
  const [adding, setAdding] = useState(false);

  // Preview image
  // ✅ Preview logic (works both locally & with Cloudinary URLs)
  const previewImage = imageFile
    ? URL.createObjectURL(imageFile) // new local upload
    : project.image?.startsWith("http") // already hosted (Cloudinary)
      ? project.image
      : null;

  // Cloudinary secure_url from DB

  // 🔹 Update Project info
  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required");
      return;
    }
    const formData = new FormData();
    formData.append("title", title || project.title);
    formData.append("description", description || project.description);
    formData.append("githubLink", githubLink || project.githubLink);
    formData.append("liveLink", liveLink || project.liveLink);

    if (imageFile instanceof File) {
      formData.append("file", imageFile); // ✅ field name should match multer/cloudinary config
    }

    updateProject(project._id, formData);
    setOpen(false);
  };

  // 🔹 Add Language
  const handleAddLanguage = async () => {
    if (!newLang.trim()) return;

    setAdding(true);
    try {
      const res = await API.patch(
        `/admin_operations/project/${project._id}/language`,
        {
          language: newLang.trim(),
        },
      );

      const updatedProject = res.data; // ✅ directly the project

      setLanguages(updatedProject.tech || []);
      updateProject(project._id, updatedProject);

      setNewLang("");
      toast.success("Language added!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add language");
    } finally {
      setAdding(false);
    }
  };

  // 🔹 Remove Language
  const handleRemoveLanguage = async (lang) => {
    try {
      const res = await API.delete(
        `/admin_operations/project/${project._id}/language`,
        {
          data: { language: lang },
        },
      );

      const updatedProject = res.data; // ✅ server returns updated project

      setLanguages(updatedProject.tech || []); // ✅ update local languages
      updateProject(project._id, updatedProject); // ✅ merge into parent state

      toast.success("Language removed!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove language");
    }
  };

  return (
    <Card
      className={`relative animation-fade ${project.completed ? "bg-gray-100" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2 flex-wrap">
        {/* Delete */}

        <Button
          disabled={deleting}
          onClick={() => deleteProject(project._id)}
          className="bg-white"
        >
          {deleting === project._id ? (
            <FaSpinner color="red" height={5} width={5} />
          ) : (
            <TrashIcon className="w-5 h-5 text-red-600" />
          )}
        </Button>

        {/* Update Project Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white">
              <FaEdit className="w-5 h-5 text-green-900" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6 max-w-md">
            <DialogHeader>
              <DialogTitle>Update Project</DialogTitle>
              <DialogDescription>
                Update project for your portfolio.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
              <textarea
                rows={2}
                cols={50}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files[0] && setImageFile(e.target.files[0])
                }
              />

              {previewImage && (
                <div className="relative w-32 h-32 group cursor-pointer mt-2">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border shadow-md transition-transform duration-300 group-hover:scale-125"
                    onClick={() => setPreviewOpen(true)}
                  />
                  {imageFile && (
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                      onClick={() => setImageFile(null)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}

              <Input
                value={githubLink}
                onChange={(e) => setGitLink(e.target.value)}
                placeholder="Github Link"
              />
              <Input
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                placeholder="Live Link"
              />
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {loadUpdate ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Languages Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white">
              <FaEdit className="w-5 h-5 text-blue-900" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6 max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Project Languages</DialogTitle>
              <DialogDescription>Add or remove languages.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-2 mt-4">
              {Array.isArray(languages) &&
                languages.map((lang, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center gap-2"
                  >
                    <span>{lang}</span>
                    <button
                      onClick={() => handleRemoveLanguage(lang)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Input
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                placeholder="Enter a language/tech"
              />
              <Button
                type="button"
                onClick={handleAddLanguage}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {adding ? "Adding..." : "Add"}
              </Button>
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Completed Toggle */}
        <input
          type="checkbox"
          checked={project.completed}
          onChange={(e) => toggleCompleted(project._id, e)}
        />
      </CardFooter>

      {/* Full Image Preview */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-transparent shadow-none border-0 p-0 max-w-fit">
          {previewImage && (
            <img
              src={previewImage}
              alt="full preview"
              className="max-h-[80vh] rounded-lg shadow-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
