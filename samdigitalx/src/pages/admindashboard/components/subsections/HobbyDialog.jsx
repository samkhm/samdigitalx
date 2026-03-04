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
import { useState } from "react";

export default function HobbyDialog({ onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    onSubmit({ title });
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:from-emerald-600 hover:to-teal-600">
          Add Hobby
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            New Hobby
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-gray-600 dark:text-gray-300">
          Create a new hobby for your portfolio.
        </DialogDescription>

        <div className="space-y-3 mt-4">
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
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
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
