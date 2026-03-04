import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import test from "node:test";
import { FaSpinner } from "react-icons/fa";

export default function TestimonyCard({
  testy,
  approveTest,
  deleteTest,
  deleting,
}) {
  return (
    <Card className="relative animation-fade">
      <CardContent>
        <p>{testy.message}</p>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 flex-wrap">
        <Button onClick={() => deleteTest(testy._id)} disabled={deleting}>
          {deleting === testy._id ? (
            <FaSpinner color="red" height={5} width={5} />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </Button>

        <label
          className={`px-3 py-1 w-fit text-sm font-medium rounded-full shadow-md transition-all duration-300 ease-in-out cursor-default
            ${
              testy.approved
                ? "text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                : "text-yellow-800 bg-gradient-to-r from-yellow-200 to-yellow-400 hover:from-yellow-300 hover:to-yellow-500"
            }`}
          onClick={() => approveTest(testy._id)}
        >
          {testy.approved ? "✅ Approved" : "⏳ Approve"}
        </label>
      </CardFooter>
    </Card>
  );
}
