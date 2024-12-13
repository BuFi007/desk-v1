import Bu from "@bu/engine";

export const engine = new Bu({
  environment: process.env.BU_ENGINE_ENVIRONMENT as
    | "production"
    | "staging"
    | "development"
    | undefined,
});
