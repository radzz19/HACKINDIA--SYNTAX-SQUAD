import { fetchWithAuth } from "../utils/api";

export const mintToken = async (to, amount) => {
  return fetchWithAuth("/api/tokens/mint", {
    method: "POST",
    body: JSON.stringify({ to, amount }),
  });
};

export const burnToken = async (from, amount) => {
  return fetchWithAuth("/api/tokens/burn", {
    method: "POST",
    body: JSON.stringify({ from, amount }),
  });
};
