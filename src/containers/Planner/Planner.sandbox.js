const axios = require("axios");

// For London Latitude is +positive and Longitude is -negative

const bikeStation = {
  id: "BikePoints_1",
  url: "/Place/BikePoints_1",
  commonName: "River Street , Clerkenwell",
  placeType: "BikePoint",
  lat: 51.529163,
  lon: -0.10997
};

function nearByCoords(bikeStation, radiusLat = 0.01, radiusLon = -0.01) {
  console.log(101, bikeStation);
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

// const radiusLat = 0.01;
// const radiusLon = -0.01;

// const nearByPoints = {
//   swLat: startPoint.lat - radiusLat, // subtract positive value
//   swLon: startPoint.lon + radiusLon, // add negative value
//   neLat: startPoint.lat + radiusLat, // add positive value
//   neLon: startPoint.lon - radiusLon // subtrace negative value
// };
// console.log("nearByPoints", nearByPoints);

// const url = `https://api.tfl.gov.uk/BikePoint?swLat=${
//   nearByPoints.swLat
// }&swLon=${nearByPoints.swLon}&neLat=${nearByPoints.neLat}&neLon=${
//   nearByPoints.neLon
// }`;
// console.log("url", url);
// console.log( `curl 'https://api.tfl.gov.uk/BikePoint?swLat=${nearByPoints.swLat}&swLon=${ nearByPoints.swLon }&neLat=${nearByPoints.neLat}&neLon=${ nearByPoints.neLon }' | jq '.[].commonName'`);

async function getNearByBikePoints(bikeStation) {
  try {
    const url = nearByUrl(bikeStation);

    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'json'
    });

    // 404s return a html page w/ 200 status - ugh... So add extra check for good response types
    if (response.status !== 200 || typeof response.data !== 'object') {
      throw Error('Invalid response')
    }

    // return nearby locations not including the start point bike location
    return response.data.filter(item => {
      return item.id !== bikeStation.id;
    });
  } catch (error) {
    // TODO:rudijs tmp error logging
    console.error('getNearByBikePoints error', error);
    return Promise.reject("Something went wrong");
  }
}

getNearByBikePoints(bikeStation).then(res => console.log('res', res.length)).catch(err => console.log('err', err))


/*
sw lat = subtract
sw lng = add

ne lat = add
ne lng = subract
*/

/*
curl 'https://api.tfl.gov.uk/BikePoint?swLat=51.4953&swLon=-0.1369&neLat=51.5011&neLon=-0.1274' | jq '.[].commonName'
"Smith Square, Westminster"
"Rochester Row, Westminster"
"Butler Place, Westminster"
"Abbey Orchard Street, Westminster"

curl 'https://api.tfl.gov.uk/BikePoint?swLat=51.4953&swLon=-0.1369&neLat=51.5211&neLon=-0.1074' | jq '.[].commonName' 
"Sail Street, Vauxhall"
"Kennington Road  , Vauxhall"
"Smith Square, Westminster"
"Rochester Row, Westminster"
"Abingdon Green, Westminster"
"King Edward Walk, Waterloo"
"Butler Place, Westminster"
"Abbey Orchard Street, Westminster"
"Archbishop's Park, Waterloo"
"Westminster Bridge Road, Elephant & Castle"
"Lambeth North Station, Waterloo"
"Lambeth Palace Road, Waterloo"
"Lower Marsh, Waterloo"
"Baylis Road, Waterloo"
"Waterloo Station 3, Waterloo"
"Waterloo Station 2, Waterloo"
"Waterloo Station 1, Waterloo"
"Jubilee Gardens, South Bank"
"Waterloo Road, South Bank"
"Concert Hall Approach 2, South Bank"
"Concert Hall Approach 1, South Bank"
"Waterloo Bridge, South Bank"
"Stamford Street, South Bank"
"Belvedere Road 1, South Bank"
"Belvedere Road 2, South Bank"
"Whitehall Place, Strand"
"Waterloo Place, St. James's"
"Northumberland Avenue, Strand"
"St. James's Square, St. James's"
"Pall Mall East, West End"
"Craven Street, Strand"
"Charles II Street, West End"
"St. Martin's Street, West End"
"William IV Street, Strand"
"Embankment (Savoy), Strand"
"Panton Street, West End"
"Somerset House, Strand"
"Southampton Street, Strand"
"Arundel Street, Temple"
"Wellington Street , Strand"
"Tallis Street, Temple"
"Tavistock Street, Covent Garden"
"Wardour Street, Soho"
"Strand, Strand"
"Frith Street, Soho"
"Moor Street, Soho"
"Houghton Street, Strand"
"Broadwick Street, Soho"
"Bouverie Street, Temple"
"Kingsway Southbound, Strand"
"Chancery Lane, Holborn"
"Kingsway, Covent Garden"
"Drury Lane, Covent Garden"
"Carey Street, Holborn"
"Sardinia Street, Holborn"
"Soho Square , Soho"
"Breams Buildings, Holborn"
"Earnshaw Street , Covent Garden"
"Newton Street, Covent Garden"
"High Holborn , Covent Garden"
"Lincoln's Inn Fields, Holborn"
"New Fetter Lane, Holborn"
"Bury Place, Holborn"
"Southampton Place, Holborn"
"Great Russell Street, Bloomsbury"
"Holborn Circus, Holborn"
"Rathbone Street, Fitzrovia "
"Red Lion Street, Holborn"
"Bayley Street , Bloomsbury"
"Hatton Garden, Holborn"
"British Museum, Bloomsbury"
"Red Lion Square, Holborn"
"Charlotte Street, Fitzrovia"
"Alfred Place, Bloomsbury"
"Theobald's Road , Holborn"
*/
