export const getStartAndEndOfDay = (data: Date) => {
  const startOfDay = new Date(data);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(data);
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};
