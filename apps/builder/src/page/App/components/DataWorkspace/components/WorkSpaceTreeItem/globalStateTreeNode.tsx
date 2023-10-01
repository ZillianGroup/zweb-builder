import { ZWEB_MIXPANEL_EVENT_TYPE } from "@zweb-public/mixpanel-utils"
import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon } from "@zweb-design/react"
import { panelBarItemContainerAnimationVariants } from "@/components/PanelBar/style"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { GlobalStateTreeItem } from "./globalStateTreeItem"
import {
  applyExpandIconStyle,
  applyJsonContentStyle,
  applyObjectOrArrayContainerStyle,
  globalStateItemContainerStyle,
  objectAndArrayDescStyle,
  objectAndArrayTitleStyle,
} from "./style"

interface IGlobalStateTreeNodeProps {
  data: Record<string, unknown>
  title: string
  level: number
  parentKey: string
  isChild?: boolean
}

export const GlobalStateTreeNode: FC<IGlobalStateTreeNodeProps> = (props) => {
  const { title, level = 0, data, parentKey, isChild = false } = props
  const expandedKeys = useSelector(getExpandedKeys)
  const uniqueKey = parentKey === title ? parentKey : `${parentKey}/${title}`

  const isExpanded = expandedKeys.includes(uniqueKey)
  const dispatch = useDispatch()
  const keyArr = Object.keys(data).filter((item) => !item.startsWith("$"))

  return (
    <>
      <div
        css={applyObjectOrArrayContainerStyle(false, level, isChild)}
        onClick={() => {
          if (isExpanded) {
            dispatch(configActions.removeExpandedKey(uniqueKey))
          } else {
            dispatch(
              configActions.setExpandedKey(expandedKeys.concat(uniqueKey)),
            )
          }
        }}
        onMouseEnter={() => {
          trackInEditor(ZWEB_MIXPANEL_EVENT_TYPE.HOVER, {
            element: "global_edit",
          })
        }}
      >
        <span css={applyExpandIconStyle(isExpanded)}>
          <CaretRightIcon />
        </span>
        <div css={globalStateItemContainerStyle}>
          <div css={objectAndArrayTitleStyle(isChild)}>{title}</div>
          <label css={objectAndArrayDescStyle}>
            {`{}`}
            {keyArr.length}
            {keyArr.length > 1 ? "keys" : "key"}
          </label>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            css={applyJsonContentStyle(false)}
            variants={panelBarItemContainerAnimationVariants}
            animate={isExpanded ? "enter" : "exit"}
            transition={{ duration: 0.2 }}
            exit="exit"
          >
            {keyArr.map((name) => (
              <GlobalStateTreeItem
                key={name}
                name={name}
                value={data[name] as Record<string, unknown>}
                itemKey={title + name}
                level={level}
                parentKey={uniqueKey}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
