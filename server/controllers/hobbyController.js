const Hobby = require("../models/Hobbies");

//api/rooms
exports.createHobby = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Hobby is required" });
    }

    const hobbyExist = await Hobby.findOne({ title });
    if (hobbyExist) {
      return res.status(409).json({ message: "Hobby already exists" });
    }

const hobbyCreated =  await Hobby.create({
      title,
      owner: req.user.id     
    });

    return res.status(201).json(hobbyCreated);

  } catch (error) {
    console.error("Error creating hobby:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



//api/hobbies/getAllHobbies
exports.getAllHobbies = async (req, res) => {
  const { search } = req.query;  
  try {
    let hobby;
    if(search && search.trim() !== ""){
      hobby = await Hobby.find({
        title : { $regex: search, $options: 'i'}
      })
    }else{
      hobby = await Hobby.find();
    }
      res.json(hobby);
  } catch (err) {
    console.error("Error fetching hobbiess:", err);
    res.status(500).json({ error: "Server error fetching hobbies" });
  }
};



//api/hobbies/:id

exports.updateHobby = async (req, res) =>{
    try {

        const hobby = await Hobby.findById(req.params.id);
        if(!hobby){
            return res.status(404).json({ message: "No Hobby found"});
        };
   
        const updatedHobby = await Hobby.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.json(updatedHobby);

        
    } catch (error) {
        console.log("Failed to update", error);
    }
};


//api/room/deleterooms
exports.deleteHobby = async (req, res) =>{
    try {
        const hobby = await Hobby.findById(req.params.id);
        if(!hobby) return res.status(404).json({ message: "Hobby not found"});

        if(req.user.role !== "admin"){
            return res.status(403).json({ message: "You cant delete a hobby"});
        };

        await Hobby.findByIdAndDelete(req.params.id);
        res.json({ message: "Hobby deleted"});
        
    } catch (error) {
        res.status(400).json({ message: error.message});
        
    }
}


