import axios from 'axios';


async function getPageRegister(page, size) {
    let data = null;
    await axios.get('/api/register/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getRegisterById(id) {
    let data = null;
    await axios.get("/api/register/" + id).then(res => data = res.data)
    return data;
}

async function addRegisterRecord(sort, name) {
    let data = null;
    await axios.post('/api/register/' + sort.id, {name}).then(res => data = res.data);
    return data;
}

async function transferToArchive(sort) {
    let data = null;
    await axios.post('/api/register/archive/' + sort.id).then(res => data = res);
    return data;
}

export {getPageRegister, getRegisterById, addRegisterRecord, transferToArchive};
