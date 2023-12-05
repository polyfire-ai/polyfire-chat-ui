export const isValideDate = (date: string): boolean => {
  if (!date) {
    return false;
  }
  if (date === '0001-01-01T00:00:00Z') {
    return false;
  }
  if (new Date(date).toString() === 'Invalid Date') {
    return false;
  }
  return true;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
