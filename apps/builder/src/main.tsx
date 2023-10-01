import * as Sentry from "@sentry/react"
import { ZWEBMixpanel } from "@zweb-public/mixpanel-utils"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "@/api/http/base"
import "@/i18n/config"
import "@/utils/dayjs"
import App from "./App"
import store from "./store"

if (
  import.meta.env.ZWEB_APP_ENV &&
  import.meta.env.ZWEB_APP_ENV !== "development" &&
  import.meta.env.ZWEB_INSTANCE_ID === "CLOUD" &&
  import.meta.env.ZWEB_SENTRY_SERVER_API
) {
  Sentry.init({
    dsn: import.meta.env.ZWEB_SENTRY_SERVER_API,
    integrations: [new Sentry.BrowserTracing()],
    environment: import.meta.env.ZWEB_APP_ENV,
    tracesSampleRate: 1.0,
    release: `zweb-builder@${import.meta.env.ZWEB_APP_VERSION}`,
  })
}

if (
  import.meta.env.ZWEB_APP_ENV &&
  import.meta.env.ZWEB_APP_ENV === "production" &&
  import.meta.env.ZWEB_INSTANCE_ID === "CLOUD"
) {
  const firstScript = document.createElement("script")
  const sendScript = document.createElement("script")
  sendScript.innerHTML = `
  window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", 'G-QW745VE33W')`
  firstScript.async = true
  firstScript.src = "https://www.googletagmanager.com/gtag/js?id=G-QW745VE33W"
  document.body.append(firstScript)
  document.body.append(sendScript)
}

ZWEBMixpanel.setDeviceID()

const root = createRoot(document.getElementById("root")!!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
