// Shared formatting helpers for design tabs

export const safeFormat = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return "N/A";
  return Number(value).toFixed(decimals);
};

export const safeGet = (obj, path, fallback = "N/A") => {
  try {
    const value = path.split(".").reduce((acc, part) => acc?.[part], obj);
    return value !== undefined && value !== null ? value : fallback;
  } catch {
    return fallback;
  }
};