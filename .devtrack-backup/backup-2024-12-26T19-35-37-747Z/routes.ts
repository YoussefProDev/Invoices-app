/**
 * An Array of Public routes
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/"];
/**
 * Login page
 * @type {string}
 */

export const LOGIN_PAGE: string = "/auth/login";
/**
 * VERIFICATION page
 * @type {string}
 */
export const NEW_VERIFICATION_PAGE: string = "/auth/new-verification";
/**
 * ERROR page
 * @type {string}
 */
export const ERROR_PAGE: string = "/auth/error";
/**
 * onBoarding page
 * @type {string}
 */
export const ONBOARDING_PAGE: string = "/onboarding";
/**
 * An Array of routes used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes: string[] = [
  LOGIN_PAGE,
  "/auth/register",
  "/auth/error",
  "/auth/new-verification",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * the prefix for api authentication routes
 * routes that start with these prefix are used for api authentication purpose
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * the default  redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
