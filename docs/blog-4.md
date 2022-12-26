# bpnm 学习笔记(4)
自定义添加组合组件:
代码实现contextPad自动添加的效果;
添加类似一个自定义条件组件, 自动连一个subProcess框;

## 学会调用自身扩展包
首先还是这个modeler
```
const bpmnModeler = new BpmnModeler({
    container: `#${domID}`
    modules: 
})

```

通过`bpmnModeler.injector._providers`能获取所有能用的扩展包, 非常多, 当前版本(10.3.0)是157个, 其中有2个应该是我自己注入的.

所有这里能看到的扩展包都能用`bpmnModeler.get(${扩展包名})`获取调用

目前我了解的就几个, 其他无说明的, 等后面接触到了慢慢补充吧.


| 扩展名 | 说明 |
| ----- | --- |
|"adaptiveLabelPositioningBehavior",|
|"alignElements",|
|"alignElementsContextPadProvider",|
|"alignElementsMenuProvider",|
|"appendBehavior",|
|"associationBehavior",|
|"attachEventBehavior",|
|"attachSupport",|
|"autoPlace",| contextPad的自动添加有用到, 下文会提及
|"autoPlaceSelectionBehavior",|
|"autoScroll",|
|"bendpointMove",|
|"bendpointMovePreview",|
|"bendpointSnapping",|
|"bendpoints",|
|"boundaryEventBehavior",|
|"bpmnAlignElements",|
|"bpmnAutoPlace",|
|"bpmnAutoResize",|
|"bpmnAutoResizeProvider",|
|"bpmnCopyPaste",|
|"bpmnDiOrdering",|
|"bpmnDistributeElements",|
|"bpmnFactory",|
|"bpmnGridSnapping",|
|"bpmnImporter",|
|"bpmnInteractionEvents",|
|"bpmnOrderingProvider",|
|"bpmnRenderer",|
|"bpmnReplace",|
|"bpmnReplacePreview",|
|"bpmnRules",|
|"bpmnSearch",| 可根据xml的中的元素id模糊搜索
|"bpmnUpdater",|
|"bpmnjs",|
|"canvas",|
|"changeSupport",|
|"clipboard",|
|"commandStack",|
|"config",|
|"connect",|
|"connectPreview",|
|"connectSnapping",|
|"connectionDocking",|
|"connectionPreview",|
|"connectionSegmentMove",|
|"contextPad",| 
|"contextPadProvider",|
|"copyPaste",|
|"create",|
|"createBehavior",|
|"createDataObjectBehavior",|
|"createMoveSnapping",|
|"createParticipantBehavior",|
|"createPreview",|
|"dataInputAssociationBehavior",|
|"dataStoreBehavior",|
|"defaultRenderer",|
|"deleteLaneBehavior",|
|"detachEventBehavior",|
|"directEditing",|
|"distributeElements",|
|"distributeElementsMenuProvider",|
|"dragging",|
|"drilldownBreadcrumbs",|
|"drilldownCentering",|
|"drilldownOverlayBehavior",|
|"dropOnFlowBehavior",|
|"editorActions",|
|"elementFactory",| 内含创建新的组件的方法, 下文会提及
|"elementRegistry",| 可用于找出所有渲染出来的组件, 下文会提及
|"eventBasedGatewayBehavior",|
|"eventBus",| 他下面的._listeners列出了所有可以监听的事件
|"fixHoverBehavior",|
|"globalConnect",|
|"graphicsFactory",|
|"gridSnapping",|
|"gridSnappingAutoPlaceBehavior",|
|"gridSnappingLayoutConnectionBehavior",|
|"gridSnappingParticipantBehavior",|
|"gridSnappingResizeBehavior",|
|"gridSnappingSpaceToolBehavior",|
|"groupBehavior",|
|"handTool",|
|"hoverFix",|
|"importDockingFix",|
|"interactionEvents",|
|"isHorizontalFix",|
|"keyboard",|
|"keyboardBindings",|
|"keyboardMove",|
|"keyboardMoveSelection",|
|"labelBehavior",|
|"labelEditingPreview",|
|"labelEditingProvider",|
|"labelSupport",|
|"lassoTool",|
|"layoutConnectionBehavior",|
|"layouter",|
|"messageFlowBehavior",|
|"moddle",|
|"moddleCopy",|
|"modeling",|
|"modelingFeedback",|
|"mouse",|
|"move",|
|"moveCanvas",|
|"movePreview",|
|"outline",|
|"overlays",|
|"padEntries",| blog2中传入contextPad自定义组件的参数, 这里可获取
|"palette",|
|"paletteEntries",|  blog2中传入palette自定义组件的参数, 这里可获取
|"paletteProvider",| 左侧的palette模块
|"pathMap",|
|"popupMenu",|
|"previewSupport",|
|"removeElementBehavior",|
|"removeEmbeddedLabelBoundsBehavior",|
|"removeParticipantBehavior",|
|"replace",| contextPad的替换功能有用到
|"replaceConnectionBehavior",|
|"replaceElementBehaviour",|
|"replaceMenuProvider",|
|"resize",|
|"resizeBehavior",|
|"resizeHandles",|
|"resizeLaneBehavior",|
|"resizePreview",|
|"resizeSnapping",|
|"rootElementReferenceBehavior",|
|"rootElementsBehavior",|
|"rules",|
|"searchPad",|
|"selection",|
|"selectionBehavior",|
|"selectionVisuals",|
|"snapping",|
|"spaceTool",|
|"spaceToolBehavior",|
|"spaceToolPreview",|
|"styles",|
|"subProcessPlaneBehavior",|
|"subProcessStartEventBehavior",|
|"subprocessCompatibility",|
|"textRenderer",|
|"toggleCollapseConnectionBehaviour",|
|"toggleElementCollapseBehaviour",|
|"toolManager",|
|"tooltips",|
|"touchFix",|
|"touchInteractionEvents",|
|"translate",| 翻译模块
|"unclaimIdBehavior",|
|"unsetDefaultFlowBehavior",|
|"updateFlowNodeRefsBehavior",|
|"zoomScroll"|

## 代码实现contextPad添加组件demo
1.  首先拖出一个开始节点 
   这一步很关键, 因为我还不会代码原地生成开始节点...

2. 获取我们要用到的扩展
```
// 定义bpmnModeler, 略
...

const elementFactory = bpmnModeler.get('elementFactory')
const elementRegistry = bpmnModeler.get('elementRegistry')
const autoPlace = bpmnModeler.get('autoPlace')

```

3. 创建一个新的task流程组件, 找到我们1里的开始节点, 自动连接上 
```

const newTaskShape = elementFactory.createShape({ type: 'bpmn:ServiceTask' })
const [rootShape, startShape] = elementRegistry.getAll()

autoPlace.append(startShape, newTaskShape)
````

以上阅读的相关代码可见`/bpmn-js/lib/features/context-pad/ContextPadProvider.js`
demo的代码例子`file: /src/demos/modelerAutoAdd`

## 自定义条件组件实现demo
在学习笔记(2)里讲了如何创建一个自定义组件, 这里我们基于`bpmn:ParallelGateway`这个基础组件, 创建一个自定义的条件组件
```
export const ConditionPalett = {
  key: 'create.condition',
  type: 'bpmn:ParallelGateway',
  group: 'gateway',
  iconClassName: 'bpmn-icon-gateway-parallel',
  title: '条件组件',
  show: true
}
```
之后把我们的自定义条件组件丢到左侧菜单栏, 监听`shape.added`的事件

```
...
// 自定义的条件组件, 自动带一个subProcess出现
    if (target.type === 'bpmn:ParallelGateway') {
        const elementFactory = modeler.get('elementFactory')
        const elementRegistry = modeler.get('elementRegistry')
        const autoPlace = modeler.get('autoPlace')
        
        const newTaskShape = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            isExpanded: true,
            rcProperties: [{
                key: 'name',
                value: 'true',
            }]
        })
        autoPlace.append(target, newTaskShape)
    }
...
```

demo的代码例子`file: /src/demos/modelerAutoAdd`