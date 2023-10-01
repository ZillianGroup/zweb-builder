import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { omit } from "@zweb-design/react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import {
  getGlobalDataExecutionResult,
  getGlobalInfoExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { GlobalStateTreeNode } from "../WorkSpaceTreeItem/globalStateTreeNode"

export const GlobalsSpaceTree: FC = () => {
  const { t } = useTranslation()

  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
  const globalStateList = useSelector(getGlobalDataExecutionResult)

  return (
    <PanelBar
      title={`${t("editor.data_work_space.globals_title")}(${
        globalInfoList.length
      })`}
      onZWebFocus={() => {
        FocusManager.switchFocus("data_global_state")
      }}
      destroyChildrenWhenClose
    >
      {globalInfoList.map((data) => (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
          level={0}
          parentKey={data.displayName}
        />
      ))}
      <GlobalStateTreeNode
        title="globalData"
        level={0}
        data={globalStateList}
        parentKey="globalData"
      />
    </PanelBar>
  )
}

GlobalsSpaceTree.displayName = "GlobalsSpaceTree"
