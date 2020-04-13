import axios from 'axios';

async function getAllUnits() {
    let data = null;
    await axios.get("/api/unit").then(res => data = res.data)
    return data;
}

async function getPageUnits(page, size) {
    let data = null;
    await axios.get('/api/unit/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getUnitById(id) {
    let data = null;
    await axios.get("/api/unit/" + id).then(res => data = res.data)
    return data;
}
async function addUnit(unitName) {
    let data = null;
    await axios.post("/api/unit", {name: unitName}).then(res => data = res.data)
    return data;
}
async function updateUnit(id, unitName) {
    let data = null;
    await axios.put("/api/unit/" + id, {name: unitName}).then(res => data = res.data)
    return data;
}

async function deleteUnit(id) {
    const data = await axios.delete("/api/unit/" + id)
    return data;
}


export {getAllUnits, getPageUnits, getUnitById, addUnit, updateUnit, deleteUnit}
