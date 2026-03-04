import API from "@/service/api";
import TestimonyCard from "../subsections/TestimonyCard";
import { useState, useEffect } from "react";

export default function Testimony() {
  const [testy, setTesty] = useState([]);
  const [deleting, setDeleting] = useState(null)

  const loadTestimony = async () => {
    try {
      const res = await API.get("/admin_operations/testimony");
      setTesty(res.data);
    } catch (error) {
      console.log("Fetching Testimny error", error);
    }
  };

  const approveTest = async (id, approved) => {
    try {
      const res = await API.put(`/admin_operations/testimony/${id}`, {
        approved: !approved,
      });
      setTesty((prev) =>
        prev.map((test) => (test._id === id ? res.data : test)),
      );
    } catch (error) {
      console.log("Aprroving Testy error", error);
    }
  };

  const deleteTest = async (id) => {
    setDeleting(id)
    try {
      const res = await API.delete(`admin_operations/testimony/${id}`);
      setTesty((prev) => prev.filter((test) => test._id !== id));
      const message = res?.data?.message || "Message deleted";
      toast.success(message);
    } catch (error) {
      const message = error?.data?.response?.message || "Failed to delete";
      toast.error(message);
    } finally{
      setDeleting(null)
    }
  };

  useEffect(() => {
    loadTestimony();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Testimonials</h3>
      </div>
      {testy.length > 0 ? (
        <section
          className="flex flex-row flex-wrap justify-center items-start max-h-110
      gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-hide"
        >
          {testy.map((test) => (
            <TestimonyCard
              key={test._id}
              testy={test}
              deleteTest={deleteTest}
              approveTest={() => approveTest(test._id, test.approved)}
              deleting={deleting}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No Testimonies found
          </p>
        </div>
      )}
    </div>
  );
}
