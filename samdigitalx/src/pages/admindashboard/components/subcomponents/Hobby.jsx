import { getUserRole } from "@/utils/auth";
import API from "@/service/api";
import { toast } from "sonner";
import HobbyDialog from "../subsections/HobbyDialog";
import HobbyCard from "../subsections/HobbyCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Hobby() {
  const [hobby, setHobby] = useState([]);
  const [hobbyQuery, setHobbyQuery] = useState("");
  const [deleting, setDeleting] = useState(null)

  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  const createHobby = async (payload) => {
    try {
      const res = await API.post("/admin_operations/hobby", payload);
      setHobby((prev) => [res.data, ...prev]);
      const message = res?.data?.message || "Hobby created";
    } catch (error) {
      const message =
        error?.response?.data?.message || "Hobby failed to be added";
      toast.error(message);
    }
  };
  const loadHobby = async () => {
    try {
      const res = await API.get(
        `/admin_operations/hobby?search=${encodeURIComponent(hobbyQuery)}`,
      );
      setHobby(res.data);
    } catch (error) {
      console.log("Error fetching hobbies", error);
    }
  };
  const updateHobby = async (id, payload) => {
    try {
      const res = await API.put(`admin_operations/hobby/${id}`, payload);
      setHobby((prev) => prev.map((h) => (h._id === id ? res.data : h)));
      const message = res?.data?.message || "Hobby updated";
      toast.success(message);
    } catch (error) {
      const message =
        error?.data?.response?.message || "Failed to update hobby";
      toast.error(message);
    }
  };
  const deleteHobby = async (id) => {
    setDeleting(id)
    try {
      const res = await API.delete(`/admin_operations/hobby/${id}`);
      setHobby((prev) => prev.filter((h) => h._id !== id));
      const message = res?.data?.message || "Hobby deleted";
      toast.success(message);
    } catch (error) {
      const message =
        error?.data?.response?.message || "Failed to delete hobby";
      toast.error(message);
    } finally{
      setDeleting(null)
    }
  };
  useEffect(() => {
    loadHobby();
  }, []);
  let filtered = [...hobby];

  const filteredHobbys = hobbyQuery.trim()
    ? filtered.filter((p) =>
        p.title?.toLowerCase().includes(hobbyQuery.toLowerCase()),
      )
    : filtered;

  return (
    <div className=" p-4">
      <div className="flex flex-col items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Hobies</h3>
        <div
          className="w-full flex flex-wrap items-center p-3
      justify-between"
        >
          {isAdmin && (
            <Input
              className="bg-gray-200 max-w-100 border-1 border-solid border-gray-700"
              placeholder="Search..."
              value={hobbyQuery}
              onChange={(e) => setHobbyQuery(e.target.value)}
            />
          )}
          {isAdmin && <HobbyDialog onSubmit={createHobby} />}
        </div>
      </div>

      {filteredHobbys.length > 0 ? (
        <section
          className="flex flex-row flex-wrap justify-center items-start max-h-110
      gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-hide"
        >
          {filteredHobbys.map((hb) => (
            <HobbyCard
              key={hb._id}
              hobby={hb}
              deleteHobby={deleteHobby}
              updateHobby={updateHobby}
              deleting={deleting}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No Hobbys found</p>
        </div>
      )}
    </div>
  );
}
