import axios from 'axios';

async function getAllSorts() {
    let data = null;
    await axios.get("/api/sort").then(res => data = res.data)
    return data;
}

async function getPageSorts(page, size) {
    let data = null;
    await axios.get('/api/sort/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfSorts() {
    let data = null;
    await axios.get('/api/sort/count').then(res => data = res);
    return data;
}

async function getSortsWhereIsCompletedResearch() {
    let data = null;
    await axios.get('/api/sort/completed').then(res => data = res);
    return data;
}

async function getSummaryOfSort(id) {
    let data = null;
    await axios.get('/api/sort/summary/' + id).then(res => data = res);
    return data;
}

async function getSortById(id) {
    let data = null;
    await axios.get("/api/sort/" + id).then(res => data = res.data)
    return data;
}
async function addSort(name, description, img, plantId) {
    let data = null;
    await axios.post("/api/sort/" + plantId, {name, description, img}).then(res => data = res.data)
    return data;
}
async function updateSort(id, name, description, img) {
    let data = null;
    await axios.put("/api/sort/" + id, {name, description, img}).then(res => data = res.data)
    return data;
}

async function deleteSort(id) {
    const data = await axios.delete("/api/sort/" + id)
    return data;
}


export {
    getAllSorts,
    getPageSorts,
    getSortsWhereIsCompletedResearch,
    getSummaryOfSort,
    getCountOfSorts,
    getSortById,
    addSort,
    updateSort,
    deleteSort
}
