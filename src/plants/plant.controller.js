const Plant = require("./plant.model");



const postAPlant = async (req, res) => {
    console.log('Attempting to create plant with data:', req.body);
    try {
        const plantData = { ...req.body };
        
        // If the main image is coming as a URL string, use it directly
        if (plantData.images?.main) {
            plantData.images = {
                main: plantData.images.main
            };
        }

        const newPlant = new Plant(plantData);
        await newPlant.save();
        console.log('Plant created successfully:', newPlant);
        res.status(200).send({ message: "Plant posted successfully", plant: newPlant });
    } catch (error) {
        console.error("Error creating plant:", error.message);
        console.error("Full error:", error);
        res.status(500).send({ message: "Failed to create plant", error: error.message });
    }
};

const updatePlant = async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to update plant with ID:', id);
    try {
        const plantData = { ...req.body };
        const updatedPlant = await Plant.findByIdAndUpdate(id, plantData, { new: true });
        if (!updatedPlant) {
            console.log('Plant not found with ID:', id);
            return res.status(404).send({ message: "Plant is not Found!" });
        }
        console.log('Successfully updated plant:', updatedPlant);
        res.status(200).send({
            message: "Plant updated successfully",
            plant: updatedPlant,
        });
    } catch (error) {
        console.error(`Error updating plant with ID ${id}:`, error.message);
        console.error("Full error:", error);
        res.status(500).send({ message: "Failed to update plant", error: error.message });
    }
};

// Get all plants
const getAllPlants = async (req, res) => {
    console.log('Fetching all plants...');
    try {
        const plants = await Plant.find().sort({ createdAt: -1 });
        console.log(`Successfully fetched ${plants.length} plants`);
        if (plants.length === 0) {
            console.log('No plants found in database');
        }
        res.status(200).send(plants);
    } catch (error) {
        console.error("Error fetching plants:", error.message);
        console.error("Full error:", error);
        res.status(500).send({ message: "Failed to fetch plants", error: error.message });
    }
};

const getSinglePlant = async (req, res) => {
    const { id } = req.params;
    console.log('Fetching plant with ID:', id);
    try {
        const plant = await Plant.findById(id);
        if (!plant) {
            console.log('Plant not found with ID:', id);
            return res.status(404).send({ message: "Plant not Found!" });
        }
        console.log('Successfully fetched plant:', plant);
        res.status(200).send(plant);
    } catch (error) {
        console.error(`Error fetching plant with ID ${id}:`, error.message);
        console.error("Full error:", error);
        res.status(500).send({ message: "Failed to fetch plant", error: error.message });
    }
};


const deleteAPlant = async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to delete plant with ID:', id);
    try {
        const deletedPlant = await Plant.findByIdAndDelete(id);
        if (!deletedPlant) {
            console.log('Plant not found with ID:', id);
            return res.status(404).send({ message: "Plant is not Found!" });
        }
        console.log('Successfully deleted plant:', deletedPlant);
        res.status(200).send({
            message: "Plant deleted successfully",
            plant: deletedPlant,
        });
    } catch (error) {
        console.error(`Error deleting plant with ID ${id}:`, error.message);
        console.error("Full error:", error);
        res.status(500).send({ message: "Failed to delete plant", error: error.message });
    }
};

module.exports = {
    postAPlant,
    getAllPlants,
    getSinglePlant,
    updatePlant,
    deleteAPlant,
};
