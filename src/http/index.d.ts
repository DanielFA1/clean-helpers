// src/http/index.d.ts

export interface ExpressLikeRequest {
  path?: string;
  originalUrl?: string;
  xhr?: boolean;
  headers?: Record<string, string | undefined>;
}


export function wantsJson(req: ExpressLikeRequest | any): boolean;

declare const _default: {
  wantsJson: typeof wantsJson;
};

export default _default;
