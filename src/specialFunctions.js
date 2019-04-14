/**
 * specialFunctions.js
 * @description As all of the functions interact in different ways to the checkout, abstraction
 * of specials is required. All specials logic is here, it is to be run as a helper class to
 * checkout.js
 */

class SpecialFunctions {
  constructor(Checkout) {
    // As this is a helper class we will keep a copy of Checkout
    this.Checkout = Checkout;
  }

  /**
   * priceDiscount
   * Decrease the per unit price of a specified product if a volume condition is met
   * @param itemSKU { string } The item which is invoking this function
   * @param discountQty { number } An int of the amount of products to purchase for this condition
   * to be met
   * @param discountedUnitPrice { number } A float that contains what we will adjust the perUnit
   * cost to
   * @return {{}} If the conditions for execution are met, we will write
   * the price here. Otherwise we will return an empty obj for destructure
   */

  priceDiscount(itemSKU, { discountQty, discountedUnitPrice }) {
    const qty = this.Checkout.getItemQty(itemSKU);

    if (qty > discountQty) {
      this.Checkout.items[itemSKU].unitPrice = discountedUnitPrice;
    }
  }

  /**
   * freeProduct
   * @description This will add a free product to every unit sold with this special flag. As product
   * quantities are added at scan time we can simply make a freeQty flag and add that post pricing
   * calculations. If the item does not exist in our current item quantities we will need to add it.
   * @param itemSKU { string } The item which is invoking this function
   * @param { targetSKU } The item in which we want to add a free item onto
   * @return {{}} We do not need to return any data as we are not making any price transformations.
   * deconstruct to not throw error on a null return
   */

  freeProduct(itemSKU, { targetSKU }) {
    const qty = this.Checkout.getItemQty(itemSKU);

    if (!this.Checkout.items[targetSKU]) {
      this.Checkout.addToItems(targetSKU);
    }

    // used increment statement as more than one item may have this style of discount on it.
    this.Checkout.items[targetSKU].freeQty += qty;

    // Qty may go negative as we transition a paid item to a free item, make sure we don't lose
    // money
    this.Checkout.items[targetSKU].qty = this.Checkout.getItemQty(targetSKU) - qty;
    if (this.Checkout.items[targetSKU].qty < 0) this.Checkout.items[targetSKU].qty = 0;
  }

  /**
   * qtyDiscount
   * @description When a product has a buy x get y free deal, we will move a item from a paid qty
   * to a free one.
   * @param itemSKU
   * @param discountQty
   * @param discountQtyVolume
   * @return {{}}
   */
  qtyDiscount(itemSKU, { discountQty, discountQtyVolume }) {
    const qty = this.Checkout.getItemQty(itemSKU);

    if (qty >= discountQty) {
      this.Checkout.items[itemSKU].qty -= discountQtyVolume;
      this.Checkout.items[itemSKU].freeQty = discountQtyVolume;
    }
  }
}

module.exports = SpecialFunctions;
