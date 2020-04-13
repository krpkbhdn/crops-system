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

async function getSortById(id) {
    let data = null;
    await axios.get("/api/sort/" + id).then(res => data = res.data)
    return data;
}
async function addSort(sortName) {
    let data = null;
    await axios.post("/api/sort", {name: sortName}).then(res => data = res.data)
    return data;
}
async function updateSort(id, sortName) {
    let data = null;
    await axios.put("/api/sort/" + id, {name: sortName}).then(res => data = res.data)
    return data;
}

async function deleteSort(id) {
    const data = await axios.delete("/api/sort/" + id)
    return data;
}


export {getAllSorts, getPageSorts, getSortById, addSort, updateSort, deleteSort}
