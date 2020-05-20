import axios from "axios"

async function getPageResearches(page, size) {
    let data = null;
    await axios.get('/api/research/page', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getPageCompletedResearches(page, size, isCompleted) {
    let data = null;
    await axios.get('/api/research/page/' + isCompleted, { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getPageArchiveResearches(page, size) {
    let data = null;
    await axios.get('/api/research/page/archive', { params: { page: page, size: size }}).then(res => data = res);
    return data;
}

async function getCountOfResearches() {
    let data = null;
    await axios.get('/api/research/count').then(res => data = res);
    return data;
}

async function getAverageResults(researchId) {
    let data = null;
    await axios.get("/api/research/average/" + researchId).then(res => data = res.data);
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

async function getDurationOfResearch(id) {
    let data = null;
    await axios.get("/api/research/duration/" + id).then(res => data = res.data);
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

async function completeResearch(id) {
    let data = null;
    await axios.put("/api/research/complete/" + id)
        .then(res => data = res);
    return data;
}

export {
    getPageResearches,
    getPageCompletedResearches,
    getPageArchiveResearches,
    getResearchById,
    getResearchParameters,
    getAverageResults,
    getCountOfResearches,
    getDurationOfResearch,
    addResearch,
    updateResearch,
    completeResearch
}
