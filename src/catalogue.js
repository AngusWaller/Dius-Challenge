/**
 * catalogue
 * @description A simple collection of products & any specials they may have. This could easily be
 * json to replicate DB style loading. I am making the assumption that the DB of choice would be
 * noSql or PostgreSQL that permits nested objects.
 */

module.exports = [
  {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99,
    special: {
      label: 'Bulk Discount',
      type: 'priceDiscount',
      discountQty: 4,
      discountedUnitPrice: 499.99,
    },

  },
  {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399.99,
    special:
      {
        label: 'Free VGA',
        type: 'freeProduct',
        targetSKU: 'vga',
      },
  },
  {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.50,
    special:
      {
        label: '3 for 2 Special',
        type: 'qtyDiscount',
        discountQty: 3,
        discountQtyVolume: 1,
      },
  },
  {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30.00,
  },
];
