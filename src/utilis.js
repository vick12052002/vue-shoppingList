
export const isPriceValid = function(price) {
  const rule = /^[1-9]\d{0,7}$/;
  return rule.test(price);
};

export const isAmountValid = function(amount) {
  const rule = /^[1-9]\d{0,7}$/;
  return rule.test(amount);
};
