import { getUserRole } from "@/utils/auth";
import { useEffect, useState } from "react";
import ServiceCard from "../subsections/ServiceCard";
import ServiceDialog from "../subsections/ServiceDialog";
import { Input } from "@/components/ui/input";
import API from "@/service/api";
import { toast } from "sonner";

export default function Service() {
  const [service, setService] = useState([]);
  const [serviceQuery, setServiceQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  const createService = async ({ title, imageFile, short, description }) => {
    setCreating(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (short) formData.append("short", short);
      if (description) formData.append("description", description);
      if (imageFile) {
        formData.append("file", imageFile); // MUST match backend .single('file')
      }

      const res = await API.post("/admin_operations/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setService((prev) => [res.data.data, ...prev]);
      toast.success("Service Created");
    } catch (error) {
      const message = error?.response?.data?.message || "Service Failed!";
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };

  const loadServices = async () => {
    try {
      const res = await API.get(
        `/admin_operations/services?search=${encodeURIComponent(serviceQuery)}`,
      );
      setService(res.data);
    } catch (error) {
      console.log("Fetching services error", error);
    }
  };

  const updateService = async (id, { title, imageFile, short, description }) => {
    try {
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (short) formData.append("short", short);
      if (description) formData.append("description", description);
      if (imageFile) formData.append("file", imageFile);

      const res = await API.put(`/admin_operations/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setService((prev) => prev.map((s) => (s._id === id ? res.data.data : s)));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const deleteService = async (id) => {
    setDeleting(id);

    try {
      const res = await API.delete(`/admin_operations/services/${id}`);

      setService((prev) => prev.filter((s) => s._id !== id));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);
  let filtered = [...service];

  const filteredProjects = serviceQuery.trim()
    ? filtered.filter((p) =>
        p.title?.toLowerCase().includes(serviceQuery.toLowerCase()),
      )
    : filtered;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Services</h3>
        <div
          className="w-full flex flex-wrap items-center p-3
      justify-between"
        >
          {isAdmin && (
            <Input
              className="bg-gray-200 max-w-100 border-1 border-solid border-gray-700"
              placeholder="Search..."
              value={serviceQuery}
              onChange={(e) => setServiceQuery(e.target.value)}
            />
          )}
          {isAdmin && (
            <ServiceDialog onSubmit={createService} creating={creating} />
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <section
          className="flex flex-row flex-wrap justify-center items-start max-h-110
      gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-hide
    "
        >
          {filteredProjects.map((serv) => (
            <ServiceCard
              key={serv._id}
              service={serv}
              deleteService={deleteService}
              updateService={updateService}
              deleting={deleting}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No Services found</p>
        </div>
      )}
    </div>
  );
}
