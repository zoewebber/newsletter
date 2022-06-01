const getApiUrl = (path: string) =>
  `${import.meta.env.VITE_BACKEND_URL}${path}`;

export default getApiUrl;
