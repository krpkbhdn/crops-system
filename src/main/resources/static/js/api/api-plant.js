import axios from 'axios';

async function getAllPlants() {
    let data = null;
    await axios.get("/api/plant").then(res => data = res.data)
    return data;
}

async function getPagePlants(page, size) {
    let data = null;
    await axios.get('/api/plant/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getPlantById(id) {
    let data = null;
    await axios.get("/api/plant/" + id).then(res => data = res.data)
    return data;
}
async function addPlant(plantName, plantDescription) {
    let data = null;
    await axios.post("/api/plant", {name: plantName, description: plantDescription}).then(res => data = res.data)
    return data;
}
async function updatePlant(id, plantName, plantDescription) {
    let data = null;
    await axios.put("/api/plant/" + id, {name: plantName, description: plantDescription}).then(res => data = res.data)
    return data;
}

async function deletePlant(id) {
    const data = await axios.delete("/api/plant/" + id)
    return data;
}


export {getAllPlants, getPagePlants, getPlantById, addPlant, updatePlant, deletePlant}
