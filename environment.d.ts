declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GIT_PROJECT_API: string;
      GIT_PROJECT_URL: string;
      GIT_TOKEN: string;
      CLICK_UP_DOC_ID: string;
      CLICK_UP_WORKSPACE_ID: string;
      CLICK_UP_TOKEN: string;
    }
  }
}
export type {};
