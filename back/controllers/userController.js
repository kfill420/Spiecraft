const sanitizeHtml = require("sanitize-html");
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

async function signupUser(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password)
    return res.json({ errorMessage: "Tout les champs sont obligatoires" });

  if (!validator.validate(email))
    return res.json({ errorMessage: "Email invalide" });

  if (password.length < 8)
    return res.json({ errorMessage: "Le mot de passe doit faire au minimum 8 caractère" });

  if (! /[0-9]/.test(password))
    return res.json({ errorMessage: "Le mot de passe doit faire au minimum 1 chiffre" });

  if (! /[A-Za-z]/.test(password))
    return res.json({ errorMessage: "Le mot de passe doit faire au minimum 1 lettre" });

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
  if (req.session.user)
    return res.json({ errorMessage: "Déjà connecté" });

  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });
  console.log(user);
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
  const token = jwt.sign(userData, 'secret', { expiresIn: '1h' });

  return res.status(200).json({ message: "Connexion réussie", token });
};

async function getUserData(req, res) {
  if (!req.session.user)
    return res.json({ errorMessage: "Vous n'êtes pas connecté" });

  const user = await Users.findOne({ where: { email: email } });
  console.log(user);
  if (!user)
    return res.status(401).json({ errorMessage: "Email ou mot de passe incorrecte" });

  const isMatching = await bcrypt.compare(password, user.password);
  if (!isMatching)
    return res.status(401).json({ errorMessage: "Email ou mot de passe incorrecte" });

  const token = jwt.sign({ userId: user.id }, 'secret')
  const firstname = user.dataValues.firstname;

  return res.status(200).json({ message: "Connexion réussie", token, firstname });
};

module.exports = {
  signupUser,
  signinUser
};