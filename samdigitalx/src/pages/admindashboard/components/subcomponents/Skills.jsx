import { Input } from "@/components/ui/input";
import { getUserRole } from "@/utils/auth";
import SkillDialog from "../subsections/SkillDialog";
import SkillCard from "../subsections/SkillCard";
import { useEffect, useState } from "react";
import API from "@/service/api";
import { toast } from "sonner";

export default function Skills() {
  const [skill, setSkill] = useState([]);
  const [creating, setCreating] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [deleting, setDeleting] = useState(null)
  const [updating, setUpdating] = useState(false)
  

  const createSkill = async ({ title, imageFile}) => {
    setCreating(true)
    try {
      const formData = new FormData();
      formData.append("tittle", title);

      if (imageFile) {
        formData.append('file', imageFile);
      }
      const res = await API.post("/admin_operations/skills", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSkill((prev) => [res.data.data, ...prev]);
      toast.success(res?.data?.message || "Skill added");
    } catch (error) {
      const message = error?.response?.data?.message || "Skill addition failed";
      toast.error(message);
    } finally{
      setCreating(false)
    }
  };

  const deleteSkill = async (id) => {
    setDeleting(id)
    try {
      const res = await API.delete(`/admin_operations/skills/${id}`);
      setSkill((prev) => prev.filter((s) => s._id !== id));
      const message = res?.data?.message || "Skil deleted";
      toast.success(message);
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete";
      toast.error(message);
    } finally{
      setDeleting(null)
    }
  };

  const loadSkills = async () => {
    try {
      const res = await API.get(
        `/admin_operations/skills?search=${encodeURIComponent(skillQuery)}`,
      );
      setSkill(res.data);
    } catch (error) {
      console.log("Skill fetch error : ", error);
    }
  };

  const updateSkill = async (id, {title, imageFile}) => {
    setUpdating(true)
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const res = await API.put(`/admin_operations/skills/${id}`, formData, {
        headers: {
          'Content-Type' : 'multipart/farm-data',
        },
      });
      setSkill((prev) => prev.map((s) => (s._id === id ? res.data.data : s)));
      const message = res?.data?.message || "Skill updated";
      toast.success(message);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update skill";
      toast.error(message);
    } finally{
      setUpdating(false)
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  let filtered = [...skill];

  const filteredSkills = skillQuery.trim()
    ? filtered.filter((p) =>
        p.title?.toLowerCase().includes(skillQuery.toLowerCase()),
      )
    : filtered;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Skills</h3>
        <div
          className="w-full flex flex-wrap items-center p-3
      justify-between"
        >
          {isAdmin && (
            <Input
              className="bg-gray-200 max-w-100 border-1 border-solid border-gray-700"
              placeholder="Search..."
              value={skillQuery}
              onChange={(e) => setSkillQuery(e.target.value)}
            />
          )}
          {isAdmin && <SkillDialog onSubmit={createSkill} creating={creating} />}
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <section
          className="flex flex-row flex-wrap justify-center items-start max-h-110
      gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-hide"
        >
          {filteredSkills.map((sk) => (
            <SkillCard
              key={sk._id}
              skill={sk}
              deleteSkill={deleteSkill}
              updateSkill={updateSkill}
              deleting={deleting}
              updating={updating}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No Skills found</p>
        </div>
      )}
    </div>
  );
}
