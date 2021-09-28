export const checkMovie = (api: string, currentPage: string | Number = "") =>
  fetch(api + currentPage).then((res) => res.json());
