const axios = require("axios");

let apiToken = "";

getToken = () => {
  axios({
    url: "https://api.petfinder.com/v2/oauth2/token",
    method: "post",
    headers: {},
    data: {
      grant_type: "client_credentials",
      client_id: "aPyHda3zCinlGy1lJ0fWFDAQQvpgUomPSbOR7igJVYp8e7WVmE",
      client_secret: "GxTgtoQT1OMTJjuBMEoJIE6dNEK9DiEZ9vkRGCZe"
    }
  })
    .then(data => {
      apiToken = data.data.access_token;
    })
    .catch(err => {
      console.log("Error in getToken()", err);
    });
};

apiAllAnimals = async (req, res, next) => {
  let animals;
  try {
    let data = await axios({
      url: "https://api.petfinder.com/v2/animals",
      method: "get",
      headers: {
        Authorization: "Bearer " + apiToken
      }
    });
    animals = data.data;
    res.status(200).json({
      status: "Success",
      data: animals,
      message: "ANIMALS"
    });
  } catch (err) {
    if (err) {
      console.log("error ===", err);
      apiToken = await getToken();
    }
  }
};

apiAllAnimalsQuery = async (req, res, next) => {
  let animals;
  let type = req.body.type;
  let color = req.body.color;
  let breed = req.body.breed;
  let size = req.body.size;
  let age = req.body.age;
  let gender = req.body.gender;
  try {
    let data = await axios({
      url: `https://api.petfinder.com/v2/animals?type=${type}&color=${color}&breed=${breed}&size=${size}&age=${age}&gender=${gender}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + apiToken
      }
    });
    animals = data.data;
    res.status(200).json({
      status: "Success",
      data: animals,
      message: "ANIMALS"
    });
  } catch (err) {
    if (err) {
      console.log("error ===", err);
      apiToken = await getToken();
    }
  }
};

apiAllOrganizations = async (req, res, next) => {
  let organizations;
  try {
    let data = await axios({
      url: "https://api.petfinder.com/v2/organizations",
      method: "get",
      headers: {
        Authorization: "Bearer " + apiToken
      }
    });
    organizations = data.data;
    res.status(200).json({
      status: "Success",
      data: organizations,
      message: "ORGANIZATIONS"
    });
  } catch (err) {
    if (err) {
      console.log("error ===", err);
      apiToken = await getToken();
    }
  }
};

getToken();
module.exports = { apiAllAnimals, apiAllOrganizations, apiAllAnimalsQuery };