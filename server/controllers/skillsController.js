const Skill = require("../models/Skills");
const cloudinary = require("../config/cloudinary");

//api/rooms
exports.createSkill = async (req, res) => {
  
  try {
    const { tittle } = req.body;

    if (!tittle?.trim()) {
      return res.status(400).json({ message: "Skill is required" });
    }

    const skillExist = await Skill.findOne({ title: tittle.trim() });
    if (skillExist) {
      return res.status(409).json({ message: "Skill already exists" });
    }

    const skillData = {
      title : tittle.trim(),
      owner: req.user.id,
    };

    if (req.file) {
      skillData.image = req.file.path;
      skillData.imagePublicId = req.file.filename;
    }

const skill = await Skill.create(skillData);

    return res.status(201).json({
      message : "Created!",
      data: skill,
    });

  } catch (error) {
    console.error("Error creating skill:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};




exports.getAllSkills = async (req, res) => {
  const { search } = req.query;
    try {
      let skill;
      if(search && search.trim() !== ""){
        skill = await Skill.find({
          title : { $regex : search, $options: 'i'}
          
        })
      } else{
        skill = await Skill.find();

      }

    res.json(skill);
  } catch (err) {
    console.error("Error fetching skill:", err);
    res.status(500).json({ error: "Server error fetching skills" });
  }
};



//api/hobbies/:id

exports.updateSkill = async (req, res) =>{
    try {

        const skill = await Skill.findById(req.params.id);
        if(!skill){
            return res.status(404).json({ message: "No skill found"});
        };
   
        if (req.body.title) {
          skill.title = req.body.title.trim();
        }
        if (req.file) {
          if (skill.imagePublicId) {
            await cloudinary.uploader.destroy(skill.imagePublicId);
          }

          skill.image = req.file.path;
          skill.imagePublicId = req.file.filename;
        }

        const updatedSkill = await skill.save();

        res.json({
          message: 'Updated!',
          data: updatedSkill,
        });

        
    } catch (error) {
        console.log("Failed to update", error);
    }
};


//api/room/deleterooms
exports.deleteSkill = async (req, res) =>{
    try {
        const skill = await Skill.findById(req.params.id);

        if(!skill) return res.status(404).json({ message: "Skill not found"});

        if(req.user.role !== "admin"){
            return res.status(403).json({ message: "You cant delete a Skill"});
        };

        if (skill.imagePublicId) {
          await cloudinary.uploader.destroy(skill.imagePublicId);
        }

        await skill.deleteOne();
        
        res.json({ message: "Skill deleted"});
        
    } catch (error) {
        res.status(400).json({ message: error.message});
        
    }
}


//portfolio
exports.getPortFolioSkills = async (req, res) => {
  try{

    const skill = await Skill.find().select("title image");
    res.json(skill);
  }      

   catch (err) {
    console.error("Error fetching skill:", err);
    
  }
};