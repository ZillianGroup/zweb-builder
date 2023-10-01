import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { USER_ROLE, getCurrentTeamInfo } from "@zweb-public/user-data"
import { isBiggerThanTargetRole } from "@zweb-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  getColor,
} from "@zweb-design/react"
import { track } from "@/utils/mixpanelHelper"
import { TeamContentEmptyProps } from "./interface"
import { emptyStyle, emptyTextStyle } from "./style"

export const TeamContentEmpty: FC<TeamContentEmptyProps> = (props) => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  return (
    <Empty
      paddingVertical="120px"
      icon={<EmptyIcon size="48px" color={getColor("grayBlue", "02")} />}
      description={
        <div css={emptyStyle}>
          <div css={emptyTextStyle}>{t("new_dashboard.desc.blank")}</div>
          {isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            currentTeamInfo.myRole,
            false,
          ) && (
            <Button
              colorScheme="grayBlue"
              loading={props.loading}
              variant="outline"
              leftIcon={<PlusIcon size="10px" />}
              onClick={() => {
                track(
                  ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
                  ZWEB_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                  {
                    element: "create_new_app",
                  },
                )
                props.navigate?.()
              }}
            >
              {t("new_dashboard.button.blank")}
            </Button>
          )}
        </div>
      }
    />
  )
}
