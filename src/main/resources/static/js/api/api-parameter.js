import axios from 'axios';

async function getAllParameters() {
    let data = null;
    await axios.get("/api/parameter").then(res => data = res.data)
    return data;
}

async function getPageParameters(page, size) {
    let data = null;
    await axios.get('/api/parameter/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getParameterById(id) {
    let data = null;
    await axios.get("/api/parameter/" + id).then(res => data = res.data)
    return data;
}
async function addParameter(name, unitId) {
    let data = null;
    await axios.post("/api/parameter/" + unitId, {name}).then(res => data = res.data)
    return data;
}
async function updateParameter(id, name) {
    let data = null;
    await axios.put("/api/parameter/" + id, {name}).then(res => data = res.data)
    return data;
}

async function deleteParameter(id) {
    const data = await axios.delete("/api/parameter/" + id)
    return data;
}


export {getAllParameters, getPageParameters, getParameterById, addParameter, updateParameter, deleteParameter}
