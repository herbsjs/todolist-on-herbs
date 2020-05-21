const checker = require("../checker");
const err = require("../errorCodes");

function format(value, expression) {
  if (checker.isEmpty(value)) return null
  const result = checker.isValidFormat(value,expression)
  return result ? null: { [err.invalidFormat]: true }
}

module.exports = format;
