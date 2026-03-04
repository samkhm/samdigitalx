import { getUserRole } from "@/utils/auth";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import API from "@/service/api";
import { Input } from "@/components/ui/input";
import ProjectDialog from "../subsections/ProjectDialog";
import ProjectItem from "../subsections/ProjectItem";

export default function Projects() {
  const [project, setProject] = useState([]);
  const [query, setQuery] = useState("");
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [creating, setCreating] = useState(false);

  const [category, setCategory] = useState("all");
  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  // creating of projects
  const loadProjects = async () => {
    try {
      const res = await API.get(
        `/admin_operations/project?search=${encodeURIComponent(query)}`,
      );

      // access res.data.projects instead of res.data
      setProject(res.data.projects || []);
    } catch (error) {
      console.error("Fetching project error:", error);
    }
  };

  const createProject = async (newProject) => {
    setCreating(true);
    try {
      // Convert to FormData
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      formData.append("githubLink", newProject.githubLink);
      formData.append("liveLink", newProject.liveLink);

      // Must match backend field name "file"
      if (newProject.imageFile) {
        formData.append("file", newProject.imageFile);
      }

      // Send POST request
      const res = await API.post("/admin_operations/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Prepend the newly created project to state
      setProject((prev) => [res.data.project, ...prev]);

      toast.success(res?.data?.message || "Project Created");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(error?.response?.data?.message || "Project Failed!");
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id) => {
    setDeleting(id);
    try {
      await API.delete(`/admin_operations/project/${id}`);
      setProject((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted");
    } catch (error) {
      console.log("Project deleting error", error);
      toast.error("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  const updateProject = async (id, payload) => {
    setLoadUpdate(true);
    try {
      let res;

      if (payload instanceof FormData) {
        res = await API.put(`/admin_operations/project/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.put(`/admin_operations/project/${id}`, payload);
      }

      const updatedProject = res.data; // ✅ directly the project object

      setProject((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedProject } : p)),
      );

      toast.success("Project updated!");
    } catch (error) {
      console.error("Update Project Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update project");
    } finally {
      setLoadUpdate(false);
    }
  };

  const toggleCompleted = async (id, e) => {
    console.log("Toggle id", id);

    const newCompleted = e.target.checked;
    try {
      const res = await API.put(`/admin_operations/project_complete/${id}`, {
        completed: newCompleted,
      });
      setProject((prev) =>
        prev.map((p) => (p._id === id ? res.data.project : p)),
      );
    } catch (err) {
      console.log("Completion error", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filter projects by category
  let filtered = [...project];
  switch (category) {
    case "completed":
      filtered = filtered.filter((p) => p.completed);
      break;
    case "uncompleted":
      filtered = filtered.filter((p) => !p.completed);
      break;
    case "all":
    default:
      break;
  }

  // Filter projects by search query
  const filteredProjects = query.trim()
    ? filtered.filter((p) =>
        p.title?.toLowerCase().includes(query.toLowerCase()),
      )
    : filtered;

  const categoryValue = [
    { name: "All Projects", key: "all" },
    { name: "Completed", key: "completed" },
    { name: "Pending", key: "uncompleted" },
  ];

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex flex-col items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Projects</h3>
        <div
          className="w-full flex flex-wrap items-center p-3
      justify-between"
        >
          {isAdmin && (
            <Input
              className="bg-gray-200 max-w-100 border-1 border-solid border-gray-700"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {isAdmin && (
            <ProjectDialog onSubmit={createProject} creating={creating} />
          )}
          {isAdmin && (
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryValue.map((v) => (
                  <SelectItem key={v.key} value={v.key}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <section
          className="flex flex-row flex-wrap justify-center items-start max-h-110
      gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-hide"
        >
          {filteredProjects.map((proj, index) => (
            <ProjectItem
              key={proj._id || index} // fallback to index if _id missing
              project={proj}
              deleteProject={deleteProject}
              updateProject={updateProject}
              toggleCompleted={toggleCompleted}
              loadUpdate={loadUpdate}
              deleting={deleting}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No Projects found</p>
        </div>
      )}
    </div>
  );
}
