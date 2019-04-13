/**
 * round
 * @description Rounds a number to a defined decimal place. Uses exponent method to avoid rounding
 * errors in js. Uses exponent style rounding as .toFixed is not as accurate. Will break with large
 * numbers that have exponents already!
 * @param value {number} target value
 * @param decimals {number} decimal places to round to
 * @return {number}
 */
const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);

module.exports = {
  round,
};
