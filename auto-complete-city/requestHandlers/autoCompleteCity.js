const url = require('url');
const querystring = require('querystring');
const cities = require('cities.json');

function findCities(str) {
    if (!str || typeof str !== 'string') return [];
    return cities.filter(city => city.name.toLowerCase().includes(str.toLowerCase()));
}

function autoCompleteCity(response, request) {
    console.log('Request handler "autoCompleteCity" was called.');

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'x-requested-with,content-type'
    });
    response.write(JSON.stringify(findCities(querystring.parse(url.parse(request.url).query).q)));
    response.end();
}

module.exports = autoCompleteCity;
