export const getQueryFormattedUrl = (queryObject: { [key: string]: string }) => {
  const queryFormattedUrl = Object.entries(queryObject).map(([key, value]) => `${key}=${value}`);

  return queryFormattedUrl.join('&');
};
