import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { FC } from "react"
import { Spin } from "@zweb-design/react"
import { WhiteList } from "@/components/WhiteList"
import { ActionTypeList } from "@/page/App/components/Actions/ActionGenerator/config"
import { track } from "@/utils/mixpanelHelper"
import { ActionCard } from "../ActionCard"
import { ActionTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { onSelect } = props

  return (
    <Spin css={containerStyle} colorScheme="techPurple" loading={false}>
      {ActionTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((actionType) => (
              <ActionCard
                key={actionType}
                actionType={actionType}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
      <WhiteList
        onCopyIpReport={() => {
          track(
            ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
            ZWEB_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
            { element: "resource_type_modal_copy" },
          )
        }}
      />
    </Spin>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
