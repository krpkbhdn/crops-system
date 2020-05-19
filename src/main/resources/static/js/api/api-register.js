import axios from 'axios';

async function addRegisterRecord(sort, name) {
    let data = null;
    await axios.post('/api/register/' + sort.id, {name}).then(res => data = res.data);
    return data;
}

async function transferToArchive(sort) {
    let data = null;
    await axios.post('/api/register/archive/' + sort.id).then(res => data = res.data);
    return data;
}

export {addRegisterRecord, transferToArchive};
