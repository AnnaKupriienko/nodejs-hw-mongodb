const parsedNumber = (value, defaultValue) => {
  const isString = typeof value === 'string';
  if (!isString) return defaultValue;

  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};

export const parsePaginationParams = ({ page, perPage }) => {
    const parsedPage = parsedNumber(page, 1);
    const parsedPerPage = parsedNumber(perPage, 10);
    return {
        page: parsedPage,
        perPage: parsedPerPage
    };
};
