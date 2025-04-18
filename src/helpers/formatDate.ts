export function formatDate(value: string) {
  const date = new Date(value);
  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  return `Monthly - ${day}${ordinalSuffix}`;
}

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
