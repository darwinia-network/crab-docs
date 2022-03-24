export type TokenSymbolT = 'CRAB' | 'PRING';

export enum FaucetClaimResultStatus {
  SUCCESS,
  IS_CLAIMED,
  NOT_ELIGIBLE,
  POOL_EMPTY,
  IN_GREYLIST,
};

export type FaucetClaimResult = {
  status: FaucetClaimResultStatus.SUCCESS;
  amount: number;
  subview: string;
} | {
  status: FaucetClaimResultStatus.IN_GREYLIST | FaucetClaimResultStatus.POOL_EMPTY;
  amount?: number;
  subview?: string;
};

export type UserInfoT = {
  isGithubOauth: boolean;
  isOauthSuccess: boolean;
  [key: string]: unknown;
};

export type CrabClaimStateT = {
  isClaimed: boolean;
};

export type PangolinClaimStateT = {
  isRateLimit: boolean;
};
