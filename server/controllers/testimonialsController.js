const Testimony = require("../models/Testimonials");

//api/rooms
exports.createTestimony = async (req, res) => {
  try {
    const { first_name, last_name, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "message is required" });
    }

    const messageExist = await Testimony.findOne({ message });
    if (messageExist) {
      return res.status(409).json({ message: "message already exists" });
    }

const messageP = await Testimony.create({
      first_name,
      last_name,
      message           
    });

    return res.status(201).json(messageP);

  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



//api/hobbies/getAllHobbies
exports.getAllTestimonies = async (req, res) => {
    try {
   messages = await Testimony.find();
   if(!messages) return res.status(401).json({ message: "No messages found"});
    res.json(messages);
  } catch (err) {
    console.error("Error fetching message:", err);
    res.status(500).json({ error: "Server error fetching messages" });
  }
};


//api/room/deleterooms
exports.deleteTestimonies = async (req, res) =>{
    try {
        const message = await Testimony.findById(req.params.id);
        if(!message) return res.status(404).json({ message: "message not found"});

        if(req.user.role !== "admin"){
            return res.status(403).json({ message: "You cant delete a message!"});
        };

        await Testimony.findByIdAndDelete(req.params.id);
        res.json({ message: "Testimony deleted"});
        
    } catch (error) {
        res.status(400).json({ message: error.message});
        
    }
}

exports.approveTestimony = async (req, res) =>{
  try {
    const approvedTesty = await Testimony.findByIdAndUpdate(
      req.params.id,
      { approved : req.body.approved },
       { new: true}
    );

    if(!approvedTesty) return res.status(404).json({ error: "No Testimony found"});

    res.json(approvedTesty);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    
  }
}
