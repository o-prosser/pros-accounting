export const currency = (value: number| string|null) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(typeof value === 'number' ? value : parseFloat(value || ""));
}