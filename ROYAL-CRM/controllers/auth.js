const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const joi = require("joi");
const bcrypt = require("bcrypt");
const database = require("./database");

module.exports = {
  login: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      email: joi.string().required().min(6).max(255).email(),
      password: joi.string().required().min(6),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    const sql = "SELECT * FROM users WHERE email=?";
    try {
      const result = await database.getConnection(sql, [reqBody.email]);
      const rows = result[0];
      const validPass = await bcrypt.compare(
        reqBody.password,
        rows[0].password_hash
      );
      if (!validPass) throw "Invalid password";
    } catch (err) {
      console.log(`Error: ${err}`);
      res.status(401).send("Unauthorized");
      return;
    }

    const param = { email: reqBody.email };
    const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: "75000s" });

    res
      .cookie("access_token", token, {
        httponly: true,
        secure: true,
      })
      .send("Welcome, you are now logged in!");
  },
};
