import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

export default function HobbyCard({
  hobby,
  deleteHobby,
  updateHobby,
  deleting,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(hobby.title);

  const handleSubmit = () => {
    updateHobby(hobby._id, { title });
    setOpen(false);
  };
  return (
    <Card className="relative animation-fade">
      <CardHeader>
        <CardTitle className="texl-lg font-semibold">{hobby.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between gap-2 flex-wrap">
        <Button onClick={() => deleteHobby(hobby._id)}>
          {deleting === hobby._id ? (
            <FaSpinner color="red" width={5} height={5} />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <BookmarkIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6">
            <DialogHeader>
              <DialogTitle>Update Hobby</DialogTitle>
              <DialogDescription>
                Update hobby for your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
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
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
