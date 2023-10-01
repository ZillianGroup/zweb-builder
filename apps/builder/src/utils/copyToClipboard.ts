import { COPY_STATUS, copyToClipboard as copy } from "@zweb-public/utils"
import { createMessage } from "@zweb-design/react"
import i18n from "@/i18n/config"

const message = createMessage()

export const copyToClipboard = (text: string) => {
  const flag = copy(text)
  if (flag === COPY_STATUS.EMPTY) {
    message.info({
      content: i18n.t("empty_copied_tips"),
    })
  } else {
    message.success({
      content: i18n.t("copied"),
    })
  }
}
