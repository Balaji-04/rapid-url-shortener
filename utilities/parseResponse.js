function parseResponse(currStatus, data){
    return {
        status: currStatus,
        data: data
    }
}
module.exports = parseResponse;