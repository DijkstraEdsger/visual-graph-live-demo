export const dateToLocalString = (date?: string) => {
  return date ? new Date(date).toLocaleString() : "";
};
