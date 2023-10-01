import { CurrentUser } from "@zweb-public/user-data"
import { authCloudRequest } from "@zweb-public/zweb-net"

export const fetchChangeNickname = (nickname: string) => {
  return authCloudRequest<{}>({
    url: "/users/nickname",
    method: "PATCH",
    data: {
      nickname,
    },
  })
}

export const fetchChangeLanguage = (language: string) => {
  return authCloudRequest<CurrentUser>({
    url: "/users/language",
    method: "PATCH",
    data: {
      language,
    },
  })
}

export const fetchChangePassword = (
  currentPassword: string,
  newPassword: string,
) => {
  return authCloudRequest({
    url: "/users/password",
    method: "PATCH",
    data: {
      currentPassword,
      newPassword,
    },
  })
}
