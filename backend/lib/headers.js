const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'authorization': `Bearer ${process.env.PPLX_KEY}`
}

module.exports = headers;
