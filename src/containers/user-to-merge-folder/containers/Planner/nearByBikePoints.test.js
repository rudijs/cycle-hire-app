import getNearByBikePoints from "./nearByBikePoints";

// jest.dontMock('axios')

describe.skip("nearByBikePoints", () => {
  it("should", done => {
    const bikeStation = {
      id: "BikePoints_1",
      url: "/Place/BikePoints_1",
      commonName: "River Street , Clerkenwell",
      placeType: "BikePoint",
      lat: 51.529163,
      lon: -0.10997
    };
    getNearByBikePoints(bikeStation)
      .then(res => {
        console.log("res", res.length);
        console.log("res", res[0]);
        done();
      })
      .catch(err => {
        console.log("err", err);
        done();
      });
  });
});
