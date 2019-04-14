/**
 * checkout.js
 * @description This contains all the checkout logic excluding specials.
 */


const SpecialFunctions = require('./specialFunctions');
const { round } = require('./helpers');

class Checkout {
  constructor(pricingRules, verbose = false) {
    this.pricingRules = pricingRules;
    this.verbose = verbose;

    /*
     We will use an object to track the items of transactions as it is a simpler way to manage
     transactional data without a DB layer handling CRUD. Also this is advantageous as we can keep
     purchased item quantities in one place. If a database layer was used this would instead be an
     array.
     */
    this.items = {};
  }

  /**
   * scan
   * @description The role of scan is to write to our class history if a scan has occurred
   * and if so, what is the quantity of the item.
   * @param sku {string} The SKU of the item you wish to add
   * @returns {Checkout} We will return checkout for improved code cleanliness.
   */
  scan(sku) {
    // increment this item qty if pre-existing, otherwise set to qty 1.
    if (this.items[sku]) {
      this.items[sku].qty += 1;
    } else {
      this.addToItems(sku);
    }
    return this;
  }

  /**
   * addToItems
   * @description Adds a new item to the Checkout items obj. This will define any fields that may
   * be required in subsiquent functions. Will return an error message however it will not throw
   * an error as the script may have correct sku's applied after the error.
   * @param sku
   * @return {{added: *}|{error: string}}
   */
  addToItems(sku) {
    // Not using deconstruct as may be null
    const item = this.pricingRules.find(rule => rule.sku === sku);

    if (!item) {
      const error = `No SKU found by the ID: ${sku}`;
      console.warn(error);
      return { error };
    }
    this.items[sku] = {
      name: item.name,
      qty: 1,
      unitPrice: item.price,
      freeQty: 0,
      totalPrice: 0,
      totalQty: 0,
    };

    return { added: sku };
  }

  /**
   * getItemQty
   * @description will fetch the current item qty from the class
   * @param sku { string } sku of the product
   * @param addFreeQty { boolean } add free qty to the result
   * @return {number} Qty of item
   */
  getItemQty(sku, addFreeQty = false) {
    return addFreeQty
      ? this.items[sku].qty + this.items[sku].freeQty || 0
      : this.items[sku].qty;
  }


  /**
   * total
   * @description All pricing & specials calculations are done here, This works by first loading a
   * helper class SpecialFunctions, then going through all the saved items and comparing it to
   * the pricing catalogue. If a special is found for that product the respective special function
   * is called. As none of the specials require advanced logic changes to the payment calculation,
   * we can simply run the special functions than do per-item summation post specials.
   * @return {number} The grand total price of this checkout transaction.
   */
  total() {
    // We will pre-load the special functions class as it transforms this Checkout class
    const specialFunctions = new SpecialFunctions(this);

    let grandTotalPrice = 0;
    /*
     We will need to increment over this.items object, to do this we will simply object keys
     Which conveniently gives us an array of used SKU's. Usually lodash would be used for this, but
     this is a vanilla project. Also making a prototype for this would pollute Object.
     */
    Object.keys(this.items).forEach((itemSKU) => {
      const { special } = this.pricingRules.find(pricingRule => pricingRule.sku === itemSKU);

      // If a special exists for this item, we will let it run & adjust the params of checkout
      if (special) {
        specialFunctions[special.type](itemSKU, special);
      }

      // Calculate the price by multiplying the item unit price by the qty. We will use the
      // saved item unit price as that may change with special conditions
      const itemTotalPrice = round(this.items[itemSKU].unitPrice * this.getItemQty(itemSKU), 2);


      grandTotalPrice += itemTotalPrice;

      // Push changes to the item object
      Object.assign(this.items[itemSKU], {
        totalQty: this.getItemQty(itemSKU, true),
        totalPrice: itemTotalPrice,
      });
    });

    if (this.verbose) {
      this.pricingBreakdown(grandTotalPrice);
    }

    return grandTotalPrice;
  }

  /**
   * pricingBreakdown
   * @description Purely to show a per item breakdown for anyone running this script. Generally a
   * logging framework like Winston would manage this.
   * @param grandTotalPrice {number}
   */
  pricingBreakdown(grandTotalPrice) {
    Object.keys(this.items).forEach((itemSKU) => {
      const { name, totalQty, totalPrice } = this.items[itemSKU];
      console.log(`Name: ${name}, Total Qty: ${totalQty}, Total Price: ${totalPrice}`);
    });
    console.log(`Total: ${grandTotalPrice}`);
    console.log('------------------------------');
  }
}

module.exports = Checkout;
