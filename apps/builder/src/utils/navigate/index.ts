import { ZWEBRoute } from "@/router"

export const handleLinkOpen = (link: string) => {
  window.open(link, "_blank")
}

export const toRegister = () => {
  ZWEBRoute.navigate("/register")
}

export const toForgotPassword = () => {
  ZWEBRoute.navigate("/forgotPassword")
}

export const openDiscord = () => {
  handleLinkOpen("https://discord.com/invite/zilliangroup")
}

export const openIssues = () => {
  handleLinkOpen("https://github.com/zilliangroup/zweb-builder/issues")
}

export const openDocumentation = () => {
  handleLinkOpen("https://www.zilliangroup.com/docs/about-zweb")
}
