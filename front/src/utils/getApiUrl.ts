export default function getApiUrl(path: string) {
  return `${import.meta.env.VITE_BACKEND_URL}${path}`;
}
