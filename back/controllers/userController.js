const sanitizeHtml = require("sanitize-html");
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

async function signupUser(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password)
    return res.status(400).json({ errorMessage: "Tout les champs sont obligatoires" });

  if (!validator.validate(email))
    return res.status(400).json({ errorMessage: "Email invalide" });

  if (password.length < 8)
    return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 8 caractère" });

  if (! /[0-9]/.test(password))
    return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 1 chiffre" });

  if (! /[A-Za-z]/.test(password))
    return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 1 lettre" });

  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser !== null)
    return res.json({ errorMessage: "L'adresse email existe déjà" });

  const nbOfSalt = parseInt(process.env.nbOfSalt) || 10;
  const hashedPassword = await bcrypt.hash(password, nbOfSalt);

  await Users.create({
    email,
    password: hashedPassword,
    firstname,
    lastname
  });

  return res.json("success")
};

async function signinUser(req, res) {
  const authHeader = req.headers['authorization'];
  const tokenToCheck = authHeader && authHeader.split(' ')[1];
  if (tokenToCheck) {
    try {
      jwt.verify(tokenToCheck, process.env.JWT_SECRET);
      return res.json({ errorMessage: "Déjà connecté" });
    } catch (err) {
      console.log(err);
      return res.json({ errorMessage: "Token invalide" });
    }
  }

  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });
  if (!user)
    return res.status(401).json({ errorMessage: "Email ou mot de passe incorrecte" });

  const isMatching = await bcrypt.compare(password, user.password);
  if (!isMatching)
    return res.status(401).json({ errorMessage: "Email ou mot de passe incorrecte" });

  const firstnameData = user.dataValues.firstname;
  const lastnameData = user.dataValues.lastname;
  const userId = user.dataValues.id;
  const fullnameData = { firstnameData, lastnameData };
  const emailData = user.dataValues.email;
  const userData = { userId, fullnameData, emailData }
  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ message: "Connexion réussie", token });
};

async function updateProfile(req, res) {
  try {
    const userIdParams = req.params.userId;
    const { type, value } = req.body;

    const updateData = {};

    if (type === "password") {
      if (value.length < 8)
        return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 8 caractère" });

      if (! /[0-9]/.test(value))
        return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 1 chiffre" });

      if (! /[A-Za-z]/.test(value))
        return res.status(400).json({ errorMessage: "Le mot de passe doit faire au minimum 1 lettre" });


      const nbOfSalt = parseInt(process.env.nbOfSalt) || 10;
      const hashedPassword = await bcrypt.hash(value, nbOfSalt);
      updateData.password = hashedPassword;

    } else if (type === "email") {
      if (!validator.validate(value))
        return res.status(400).json({ errorMessage: "Email invalide" });

      const existingUser = await Users.findOne({ where: { email: value } });
      if (existingUser !== null)
        return res.status(400).json({ errorMessage: "L'adresse email existe déjà" });

      updateData.email = value;
    } else {
      updateData[type] = value;
    }

    await Users.update(
      updateData,
      {
        where: {
          id: userIdParams
        }
      }
    );

    const user = await Users.findOne({ where: { id: userIdParams } });
    if (!user)
      return res.status(401).json({ errorMessage: "Email ou mot de passe incorrecte" });

    const firstnameData = user.dataValues.firstname;
    const lastnameData = user.dataValues.lastname;
    const userId = user.dataValues.id;
    const fullnameData = { firstnameData, lastnameData };
    const emailData = user.dataValues.email;
    const userData = { userId, fullnameData, emailData }
    const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: "Changement réussie", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: "Erreur interne" });
  }

};

module.exports = {
  signupUser,
  signinUser,
  updateProfile,
};