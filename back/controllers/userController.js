const sanitizeHtml = require("sanitize-html");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

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
  console.log(existingUser);
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
}

async function signinUser(req, res) {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });
  if (!user)
    return res.json({ errorMessage: "Erreur email - mot de passe" });

  const isMatching = await bcrypt.compare(password, user.password);
  if (!isMatching)
    return res.json({ errorMessage: "Erreur email - mot de passe" });

  req.session.userId = user.id;

  return res.json("success login" + req.session.userId);
}

module.exports = {
  signupUser,
  signinUser
};