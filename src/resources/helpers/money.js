export const money = {
  sumAll: (arr) => {
    const sum = (accumulator, currentValue) => accumulator + currentValue;
    return arr.reduce(sum, 0);
  },
  mask: (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },
};
