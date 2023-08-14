export const getQueryFormattedUrl = (queryObject: { [key: string]: string }) => {
  const queryFormattedUrl = Object.entries(queryObject).map(([key, value]) => {
    if (value === '') return '';

    if (key === 'companies') {
      return `companyNames=${value}`;
    }

    return `${key}=${value}`;
  });

  return queryFormattedUrl.filter((queryParam) => queryParam !== '').join('&');
};
