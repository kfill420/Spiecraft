const { Cart, ProductCart, Product } = require("../models");

async function getCart(req, res) {
  const userId = req.params.userId;
  let cart = await Cart.findOne({ where: { users_id: userId } });


  if (!cart) {
    cart = await Cart.create({ users_id: userId });
  }

  let productCart = await ProductCart.findAll({
    where: { cart_id: cart.id },
    include: [{
      model: Product,
      attributes: ['name', 'description', 'price', 'image_url']
    }]
  });
  console.log(productCart.dataValues);

  res.json(productCart);
}

async function addToCart(req, res) {
  try {
    const { userId, productId, quantity, price } = req.body;

    let cart = await Cart.findOne({ where: { users_id: userId } });

    if (!cart) {
      cart = await Cart.create({ users_id: userId });
    }

    let productCart = await ProductCart.findOne({ where: { product_id: productId, cart_id: cart.id } });

    console.log(parseFloat(productCart.price));

    if (productCart) {
      productCart.quantity += quantity;
      let currentPrice = parseFloat(productCart.price);
      currentPrice += parseFloat(price);
      productCart.price = currentPrice;
      await productCart.save();
    } else {
      await ProductCart.create({
        cart_id: cart.id,
        product_id: productId,
        quantity: quantity,
        price: price
      });
    }

    res.status(201).json({ message: "Produit ajouté au panier", cart });
  } catch (error) {
    console.log("Erreur:" + error);
    res.status(500).json({ errorMessage: "Erreur serveur" });
  }
}

module.exports = {
  getCart,
  addToCart
};