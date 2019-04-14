/**
 * index.js
 * @description This is a basic example of how the checkout works according to challenge
 * specifications. All logic is in ./src & all unit tests are in ./test
 * @type {Checkout}
 */


const Checkout = require('./src/checkout');
const catalogue = require('./src/catalogue');

const verbose = true;

// Note that verbose is an optional param and will simply give us a log of the product breakdown
const co = new Checkout(catalogue, verbose);
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');
co.total();

// Using shorthand
new Checkout(catalogue, verbose)
  .scan('atv')
  .scan('ipd')
  .scan('ipd')
  .scan('atv')
  .scan('ipd')
  .scan('ipd')
  .scan('ipd')
  .total();

new Checkout(catalogue, verbose)
  .scan('mbp')
  .scan('vga')
  .scan('ipd')
  .total();
