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
