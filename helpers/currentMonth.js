const now = new Date();
export const currentMonth = now.toLocaleString('default', {
  month: 'long',
  year: 'numeric',
});