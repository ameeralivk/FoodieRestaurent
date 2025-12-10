export function calculateRenewalDateFrom(startDate: Date, duration: string|number): Date {
  const result = new Date(startDate);

  const [valueStr, unit] = duration.toString().trim().toLowerCase().split(" ");

  const value = parseInt(valueStr as string);

  if (isNaN(value)) {
    throw new Error("Invalid duration format");
  }

  switch (unit) {
    case "day":
    case "days":
      result.setDate(result.getDate() + value);
      break;

    case "month":
    case "months":
      result.setMonth(result.getMonth() + value);
      break;

    case "year":
    case "years":
      result.setFullYear(result.getFullYear() + value);
      break;

    default:
      throw new Error("Invalid duration unit. Use days, months, or years.");
  }

  return result;
}