import axios from 'axios';

async function getAllZones() {
    let data = null;
    await axios.get("/api/climate-zone").then(res => data = res.data)
    return data;
}

async function getPageZones(page, size) {
    let data = null;
    await axios.get('/api/climate-zone/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfZones() {
    let data = null;
    await axios.get('/api/climate-zone/count').then(res => data = res);
    return data;
}

async function getZoneById(id) {
    let data = null;
    await axios.get("/api/climate-zone/" + id).then(res => data = res.data)
    return data;
}
async function addZone(name) {
    let data = null;
    await axios.post("/api/climate-zone", {name}).then(res => data = res.data)
    return data;
}
async function updateZone(id, name) {
    let data = null;
    await axios.put("/api/climate-zone/" + id, {name}).then(res => data = res.data)
    return data;
}

async function deleteZone(id) {
    const data = await axios.delete("/api/climate-zone/" + id)
    return data;
}


export {getAllZones, getPageZones, getCountOfZones, getZoneById, addZone, updateZone, deleteZone}
