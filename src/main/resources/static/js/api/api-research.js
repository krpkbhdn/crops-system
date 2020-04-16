import axios from "axios"

async function getPageResearches(page, size) {
    let data = null;
    await axios.get('/api/research/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfResearches() {
    let data = null;
    await axios.get('/api/research/count').then(res => data = res);
    return data;
}

async function getResearchById(id) {
    let data = null;
    await axios.get("/api/research/" + id).then(res => data = res.data);
    return data;
}

async function getResearchParameters(id) {
    let data = null;
    await axios.get("/api/research/parameters/" + id).then(res => data = res.data);
    return data;
}

async function addResearch(stationId, sortId) {
    let data = null;
    await axios.post("/api/research/" + stationId + "/" + sortId, {name}).then(res => data = res.data);
    return data;
}
async function updateResearch(id, results) {
    let data = null;
    await axios.put("/api/research/" + id, {param: results.parameter, value: results.value})
        .then(res => data = res.data);
    return data;
}

export {
    getPageResearches,
    getResearchById,
    getResearchParameters,
    getCountOfResearches,
    addResearch,
    updateResearch
}
