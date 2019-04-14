/**
 * index.js
 * @description This is a basic example of how the checkout works according to challenge
 * specifications. All logic is in ./src & all unit tests are in ./test
 * @type {Checkout}
 */


const Checkout = require('./src/checkout');
const catalogue = require('./src/catalogue');

// Using the formatting prescribed in the test
const co = new Checkout(catalogue);
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');
co.total();

// Using shorthand
new Checkout(catalogue)
  .scan('atv')
  .scan('ipd')
  .scan('ipd')
  .scan('atv')
  .scan('ipd')
  .scan('ipd')
  .scan('ipd')
  .total();

new Checkout(catalogue, true)
  .scan('mbp')
  .scan('vga')
  .scan('ipd')
  .total();
