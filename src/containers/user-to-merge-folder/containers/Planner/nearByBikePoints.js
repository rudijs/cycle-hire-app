import axios from "axios";

/* Example input type
*
const bikeStation = {
  id: "BikePoints_1",
  url: "/Place/BikePoints_1",
  commonName: "River Street , Clerkenwell",
  placeType: "BikePoint",
  lat: 51.529163,
  lon: -0.10997
};
*
Example use
*
getNearByBikePoints(bikeStation).then(res => console.log('res', res.length)).catch(err => console.log('err', err))
*/

// For London Latitude is +positive and Longitude is -negative
function nearByCoords(bikeStation, radiusLat = 0.01, radiusLon = -0.01) {
  return {
    swLat: bikeStation.lat - radiusLat, // subtract positive value
    swLon: bikeStation.lon + radiusLon, // add negative value
    neLat: bikeStation.lat + radiusLat, // add positive value
    neLon: bikeStation.lon - radiusLon // subtrace negative value
  };
}

function nearByUrl(bikeStation) {
  const c = nearByCoords(bikeStation);
  return `https://api.tfl.gov.uk/BikePoint?swLat=${c.swLat}&swLon=${
    c.swLon
  }&neLat=${c.neLat}&neLon=${c.neLon}`;
}

export default async function getNearByBikePoints(bikeStation) {
  try {
    const url = nearByUrl(bikeStation);

    const response = await axios({
      method: "get",
      url: url,
      responseType: "json"
    });

    // 404s return a html page w/ 200 status - ugh... So add extra check for good response types
    if (response.status !== 200 || typeof response.data !== "object") {
      throw Error("Invalid response");
    }

    // return nearby locations not including the start point bike location
    return response.data
      .filter(item => {
        return item.id !== bikeStation.id;
      })
      .map(item => {
        let nbBikes, nbEmptyDocks, nbDocks;
        item.additionalProperties.forEach(element => {
          switch (element.key) {
            case "NbBikes":
              nbBikes = element.value;
              break;
            case "NbEmptyDocks":
              nbEmptyDocks = element.value;
              break;
            case "NbDocks":
              nbDocks = element.value;
              break;
            default:
              break;
          }
        });
        return {
          id: item.id,
          url: item.url,
          commonName: item.commonName,
          lat: item.lat,
          lon: item.lon,
          nbBikes,
          nbEmptyDocks,
          nbDocks
        };
      });
  } catch (error) {
    // TODO:rudijs tmp error logging
    console.error("getNearByBikePoints error", error);
    return Promise.reject("Something went wrong");
  }
}
