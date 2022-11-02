const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/create", (req, res, next) => {
  res.render("characters/create-character");
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

/*CREATE new character*/
router.post("/characters/create", (req, res, next) => {
  if (req.body.debt === "on") {
    req.body.debt = true;
  } else {
    req.body.debt = false;
  }
  axios
    .post("https://ih-crud-api.herokuapp.com/characters", req.body)
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.redirect("/characters");
    })
    .catch((err) => console.error(err));
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
