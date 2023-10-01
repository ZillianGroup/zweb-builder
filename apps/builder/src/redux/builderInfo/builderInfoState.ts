export interface BuilderInfo {
  version: string
  language: string
}

export const BuilderInfoInitialState: BuilderInfo = {
  version: import.meta.env.ZWEB_APP_VERSION,
  language: "English",
}
