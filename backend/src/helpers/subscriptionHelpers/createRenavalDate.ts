function calculateRenewalDate(duration: string|number): Date {
  const renewal = new Date();
  const [rawValue, rawUnit] = duration.toString().split(" ");
  if (!rawValue || !rawUnit) {
    throw new Error("Invalid duration format. Expected 'number unit'");
  }

  const value = parseInt(rawValue);
  const unit = rawUnit.toLowerCase();

  if (unit.includes("day")) {
    renewal.setDate(renewal.getDate() + value);
  } else if (unit.includes("month")) {
    renewal.setMonth(renewal.getMonth() + value);
  } else if (unit.includes("year")) {
    renewal.setFullYear(renewal.getFullYear() + value);
  }

  return renewal;
}

export default calculateRenewalDate