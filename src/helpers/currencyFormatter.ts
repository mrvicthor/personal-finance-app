export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(value);
};

export const formatNumber = (value: number) => {
  return "$" + Math.round(value).toLocaleString("en-US");
};
