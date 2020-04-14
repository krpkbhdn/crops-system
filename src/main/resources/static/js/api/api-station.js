import axios from 'axios';

async function getAllStations() {
    let data = null;
    await axios.get("/api/station").then(res => data = res.data)
    return data;
}

async function getPageStations(page, size) {
    let data = null;
    await axios.get('/api/station/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfStations() {
    let data = null;
    await axios.get('/api/station/count').then(res => data = res);
    return data;
}

async function getStationById(id) {
    let data = null;
    await axios.get("/api/station/" + id).then(res => data = res.data)
    return data;
}
async function addStation(name, address, phone, zip, climateZoneId) {
    let data = null;
    await axios.post("/api/station/" + climateZoneId, {name, address, phone, zip}).then(res => data = res.data)
    return data;
}
async function updateStation(id, name, address, phone, zip) {
    let data = null;
    await axios.put("/api/station/" + id, {name, address, phone, zip}).then(res => data = res.data)
    return data;
}

async function deleteStation(id) {
    const data = await axios.delete("/api/station/" + id)
    return data;
}


export {getAllStations, getPageStations, getCountOfStations, getStationById, addStation, updateStation, deleteStation}
