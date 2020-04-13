import axios from 'axios';

async function getAllCrops() {
    let data = null;
    await axios.get("/api/crop").then(res => data = res.data)
    return data;
}

async function getPageCrops(page, size) {
    let data = null;
    await axios.get('/api/crop/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfCrops() {
    let data = null;
    await axios.get('/api/crop/count').then(res => data = res);
    return data;
}

async function getCropById(id) {
    let data = null;
    await axios.get("/api/crop/" + id).then(res => data = res.data)
    return data;
}
async function addCrop(cropName) {
    let data = null;
    await axios.post("/api/crop", {name: cropName}).then(res => data = res.data)
    return data;
}
async function updateCrop(id, cropName) {
    let data = null;
    await axios.put("/api/crop/" + id, {name: cropName}).then(res => data = res.data)
    return data;
}

async function deleteCrop(id) {
    const data = await axios.delete("/api/crop/" + id)
    return data;
}


export {getAllCrops, getCountOfCrops, getPageCrops, getCropById, addCrop, updateCrop, deleteCrop}
