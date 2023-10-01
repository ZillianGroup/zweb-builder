import { ZWEBBuilderStorage } from "@/utils/storage"

export const getAuthToken = () => {
  return ZWEBBuilderStorage.getLocalStorage("token") as string
}

export const removeAuthToken = () => {
  return ZWEBBuilderStorage.removeLocalStorage("token")
}
