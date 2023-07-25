export const getQueryFormattedUrl = (queryObject: { [key: string]: string }) => {
  const queryFormattedUrl: string[] = [];

  Object.entries(queryObject).forEach(([key, value]) => {
    queryFormattedUrl.push(`${key}=${value}`);
  });

  console.log(queryFormattedUrl);

  return queryFormattedUrl.join('&');
};
