export const date = {
  hasOneMonthDifferenceFromDate: (date) => {
    // Converta a data fornecida para um objeto Date
    const parts = date.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const providedDate = new Date(year, month, day);

    // Obtenha a data atual
    const currentDate = new Date();

    // Calcule a diferença em milissegundos
    const timeDiff = Math.abs(currentDate - providedDate);

    // Calcule o número de milissegundos em 30 dias
    const millisecondsIn30Days = 30 * 24 * 60 * 60 * 1000;

    // Verifique se a diferença é exatamente de 30 dias
    return timeDiff === millisecondsIn30Days;
  },
};
