const filterPriceBySelectedCurrency = (activeCurrency, priceList) => (
  priceList.find((elem) => elem.currency.symbol === activeCurrency)
);

export default filterPriceBySelectedCurrency;
