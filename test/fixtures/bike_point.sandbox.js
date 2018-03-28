const fs = require("fs");
// const path = require('path')

const fileName = "bike_point.json";

const rawData = JSON.parse(fs.readFileSync(fileName))
// console.log(data)

const data = rawData.map(item => {
    return {
        id: item.id,
        commonName: item.commonName,
        lat: item.lat,
        lon: item.lon
    }
}) 

console.log(data.length)
console.log(data[0])
console.log(data[1])