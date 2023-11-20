export function isDateWithinCurrentMonth(dateString) {
  // Converte a data fornecida para um objeto Date
  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Subtrai 1 porque os meses em JavaScript são baseados em zero
  const year = parseInt(dateParts[2]);
  const providedDate = new Date(year, month, day);

  // Obtém a data atual
  const currentDate = new Date();

  // Verifica se a data fornecida está no mesmo mês e ano que a data atual
  return (
    providedDate.getFullYear() === currentDate.getFullYear() &&
    providedDate.getMonth() === currentDate.getMonth()
  );
}
