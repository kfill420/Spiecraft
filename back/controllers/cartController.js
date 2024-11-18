const { Cart, ProductCart, Product } = require("../models");

async function getCart(req, res) {
  try {
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
    res.json(productCart);
  } catch (error) {
    console.log("Erreur:" + error);
    res.status(500).json({ errorMessage: "Erreur chargement du panier" });
  }

}

async function addToCart(req, res) {
  try {
    const { userId, productId, quantity, price } = req.body;
    let cart = await Cart.findOne({ where: { users_id: userId } });
    if (!cart) {
      cart = await Cart.create({ users_id: userId });
    }

    let productCart = await ProductCart.findOne({ where: { product_id: productId, cart_id: cart.id } });
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

    let productCarts = await ProductCart.findAll({
      where: { cart_id: cart.id },
      include: [{
        model: Product,
        attributes: ['name', 'description', 'price', 'image_url']
      }]
    });

    res.status(201).json({ message: "Produit ajouté au panier", productCarts });
  } catch (error) {
    console.log("Erreur:" + error);
    res.status(500).json({ errorMessage: "Erreur d'ajout" });
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ where: { users_id: userId } });

    if (!cart) {
      return res.status(404).json({ errorMessage: "Panier introuvable" });
    }

    let productCart = await ProductCart.findOne({ where: { product_id: productId, cart_id: cart.id } });

    if (!productCart) {
      return res.status(404).json({ errorMessage: "Produit introuvable dans le panier" });
    }

    await productCart.destroy();

    res.json({ message: "Produit retiré du panier", productCart });
  } catch (error) {
    console.log("Erreur:" + error);
    res.status(500).json({ errorMessage: "Erreur de supression" });
  }

}

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};