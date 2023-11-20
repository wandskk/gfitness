export function isMoreThanOneMonthApart(dateString) {
  // Converte a data fornecida para um objeto Date
  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Subtrai 1 porque os meses em JavaScript são baseados em zero
  const year = parseInt(dateParts[2]);
  const providedDate = new Date(year, month, day);

  // Obtém a data atual
  const currentDate = new Date();

  // Calcula a diferença em milissegundos entre as duas datas
  const timeDiff = currentDate - providedDate;

  // Calcula o número de dias em um mês
  const daysInMonth = 30.44; // Média de dias em um mês

  // Calcula o número de milissegundos em um mês
  const oneMonthInMillis = daysInMonth * 24 * 60 * 60 * 1000;

  // Verifica se a diferença é maior que um mês inteiro
  return timeDiff > oneMonthInMillis;
}
