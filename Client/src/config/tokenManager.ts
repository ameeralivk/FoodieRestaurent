// src/utils/tokenManager.ts
let accessToken: string | null = null;

export const tokenManager = {
  set: (token: string) => { accessToken = token; },
  get: () => accessToken,
  clear: () => { accessToken = null; }
};
