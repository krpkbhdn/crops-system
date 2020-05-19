import axios from 'axios';

async function addRegisterRecord(sort, name) {
    let data = null;
    await axios.post('/api/register/' + sort.id, {name}).then(res => data = res.data);
    return data;
}

export {addRegisterRecord};
