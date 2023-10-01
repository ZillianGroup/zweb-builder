import { cloneDeep, get, set, toPath } from "lodash"
import { evaluateDynamicString } from "../evaluateDynamicString"
import { runEventHandler } from "../eventHandlerHelper"
import { ZWEBEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"
import { convertPathToString } from "../executionTreeHelper/utils"

export const runAllEventHandler = (
  events: any[] = [],
  dynamicAttrPaths: string[] = [],
) => {
  const finalContext =
    ZWEBEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const needRunEvents = cloneDeep(events)
  dynamicAttrPaths.forEach((path) => {
    const realPath = convertPathToString(toPath(path).slice(1))
    try {
      const dynamicString = get(needRunEvents, realPath, "")
      if (dynamicString) {
        const calcValue = evaluateDynamicString(
          `events${realPath}`,
          dynamicString,
          finalContext,
        )
        set(needRunEvents, realPath, calcValue)
      }
    } catch (e) {
      console.log(e)
    }
  })
  needRunEvents.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}
