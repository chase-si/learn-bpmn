# bpnm 学习笔记(5)
学习事件监听:
事件监听简单总结;
对接触过的一些事件添加注释;
禁用原来的双击修改组件名称事件;

## 事件绑定
首先还是这个modeler
```
const bpmnModeler = new BpmnModeler({
    container: `#${domID}`
    modules: 
})
```

前面的我们已经用过基础版的绑定事件
```
bpmnModeler.on('import.done', e => {
    console.log('import xml has done')
})
```
这里也可用eventBus模块绑定事件
```
const eventBus = bpmnModeler.get('eventBus')
eventBus.on('import.done', e => {
    console.log('import xml has done')
})
```
eventBus除了提供`on`, 还有`off`解除时间监听, `once`添加一次触发

事件监听实际有3个参数, `on(${事件名称}, ${优先级}, ${事件回调})`, 如果第二个参数不传优先级直接传回调, 他会采用默认优先级(1000), 所以我们最早的代码可直接生效.

相关源码阅读: 
`file: node_modules/diagram-js/lib/core/EventBus.js`

## 禁用组件原始自带的双击修改名称事件
优先级需要高于原来默认的事件, 原来的是1000, 同时e是作为event本身, 直接不再返回从而禁掉事件
```
bpmnModeler.on('element.dblclick', 1001, e => {
    return null
})
```

## 查看所有的事件
通过`bpmnModeler.get('eventBus')._listeners`能获取所有能监听的事件

目前我了解的就几个, 其他无说明的, 等后面接触到了慢慢补充吧.


| 扩展名 | 说明 |
| ----- | --- |
|"attach",|
|"autoPlace",|
|"autoPlace.end",|
|"autoPlace.start",|
|"bendpoint.move.cancel",|
|"bendpoint.move.cleanup",|
|"bendpoint.move.end",|
|"bendpoint.move.hover",|
|"bendpoint.move.move",|
|"bendpoint.move.out",|
|"bendpoint.move.start",|
|"bpmnElement.added",|
|"canvas.destroy",|
|"canvas.init",|
|"canvas.resized",|
|"canvas.viewbox.changed",|
|"canvas.viewbox.changing",|
|"commandStack.canvas.updateRoot.executed",|
|"commandStack.canvas.updateRoot.postExecute",|
|"commandStack.canvas.updateRoot.preExecute",|
|"commandStack.canvas.updateRoot.reverted",|
|"commandStack.changed",|
|"commandStack.connection.create.canExecute",|
|"commandStack.connection.create.executed",|
|"commandStack.connection.create.postExecute",|
|"commandStack.connection.create.postExecuted",|
|"commandStack.connection.create.preExecute",|
|"commandStack.connection.create.preExecuted",|
|"commandStack.connection.create.reverted",|
|"commandStack.connection.delete.executed",|
|"commandStack.connection.delete.preExecute",|
|"commandStack.connection.delete.reverted",|
|"commandStack.connection.layout.executed",|
|"commandStack.connection.layout.postExecute",|
|"commandStack.connection.layout.postExecuted",|
|"commandStack.connection.layout.reverted",|
|"commandStack.connection.move.executed",|
|"commandStack.connection.move.postExecute",|
|"commandStack.connection.move.preExecute",|
|"commandStack.connection.move.reverted",|
|"commandStack.connection.reconnect.canExecute",|
|"commandStack.connection.reconnect.executed",|
|"commandStack.connection.reconnect.postExecute",|
|"commandStack.connection.reconnect.preExecute",|
|"commandStack.connection.reconnect.reverted",|
|"commandStack.connection.start.canExecute",|
|"commandStack.connection.updateWaypoints.canExecute",|
|"commandStack.connection.updateWaypoints.executed",|
|"commandStack.connection.updateWaypoints.postExecute",|
|"commandStack.connection.updateWaypoints.postExecuted",|
|"commandStack.connection.updateWaypoints.reverted",|
|"commandStack.element.autoResize.canExecute",|
|"commandStack.element.copy.canExecute",|
|"commandStack.element.updateAttachment.executed",|
|"commandStack.element.updateAttachment.reverted",|
|"commandStack.element.updateProperties.executed",|
|"commandStack.element.updateProperties.postExecute",|
|"commandStack.element.updateProperties.postExecuted",|
|"commandStack.element.updateProperties.reverted",|
|"commandStack.elements.align.canExecute",|
|"commandStack.elements.create.canExecute",|
|"commandStack.elements.create.postExecuted",|
|"commandStack.elements.create.preExecute",|
|"commandStack.elements.delete.postExecuted",|
|"commandStack.elements.delete.preExecute",|
|"commandStack.elements.distribute.canExecute",|
|"commandStack.elements.move.canExecute",|
|"commandStack.elements.move.postExecuted",|
|"commandStack.elements.move.preExecute",|
|"commandStack.elements.move.preExecuted",|
|"commandStack.executed",|
|"commandStack.label.create.execute",|
|"commandStack.label.create.postExecute",|
|"commandStack.label.create.postExecuted",|
|"commandStack.label.create.revert",|
|"commandStack.lane.add.postExecuted",|
|"commandStack.lane.add.preExecute",|
|"commandStack.lane.resize.postExecuted",|
|"commandStack.lane.resize.preExecute",|
|"commandStack.lane.split.postExecuted",|
|"commandStack.lane.split.preExecute",|
|"commandStack.revert",|
|"commandStack.shape.append.preExecute",|
|"commandStack.shape.attach.canExecute",|
|"commandStack.shape.create.canExecute",|
|"commandStack.shape.create.execute",|
|"commandStack.shape.create.executed",|
|"commandStack.shape.create.postExecute",|
|"commandStack.shape.create.postExecuted",|
|"commandStack.shape.create.preExecute",|
|"commandStack.shape.create.revert",|
|"commandStack.shape.create.reverted",|
|"commandStack.shape.delete.execute",|
|"commandStack.shape.delete.executed",|
|"commandStack.shape.delete.postExecute",|
|"commandStack.shape.delete.postExecuted",|
|"commandStack.shape.delete.preExecute",|
|"commandStack.shape.delete.preExecuted",|
|"commandStack.shape.delete.revert",|
|"commandStack.shape.delete.reverted",|
|"commandStack.shape.move.executed",|
|"commandStack.shape.move.postExecute",|
|"commandStack.shape.move.postExecuted",|
|"commandStack.shape.move.preExecute",|
|"commandStack.shape.move.reverted",|
|"commandStack.shape.replace.postExecute",|
|"commandStack.shape.replace.postExecuted",|
|"commandStack.shape.replace.preExecuted",|
|"commandStack.shape.resize.canExecute",|
|"commandStack.shape.resize.executed",|
|"commandStack.shape.resize.postExecute",|
|"commandStack.shape.resize.postExecuted",|
|"commandStack.shape.resize.preExecute",|
|"commandStack.shape.resize.reverted",|
|"commandStack.shape.toggleCollapse.execut|ed",|
|"commandStack.shape.toggleCollapse.postExecuted",|
|"commandStack.shape.toggleCollapse.reverted",|
|"commandStack.spaceTool.postExecuted",|
|"commandStack.spaceTool.preExecute",|
|"connect.cleanup",|
|"connect.end",|
|"connect.hover",|
|"connect.move",|
|"connect.out",|
|"connect.start",|
|"connection.added",|
|"connection.changed",|
|"connection.remove",|
|"connection.removed",|
|"connectionSegment.move.cancel",|
|"connectionSegment.move.cleanup",|
|"connectionSegment.move.end",|
|"connectionSegment.move.hover",|
|"connectionSegment.move.move",|
|"connectionSegment.move.out",|
|"connectionSegment.move.start",|
|"contextPad.create",|
|"contextPad.getProviders",|
|"copyPaste.copyElement",|
|"copyPaste.createTree",|
|"copyPaste.pasteElement",|
|"copyPaste.pasteElements",|
|"create.cleanup",|
|"create.end",|
|"create.hover",|
|"create.init",|
|"create.move",|
|"create.out",|
|"create.rejected",|
|"create.start",|
|"detach",|
|"diagram.clear",|
|"diagram.destroy",|
|"diagram.init",|
|"directEditing.activate",|
|"directEditing.cancel",|
|"directEditing.complete",|
|"directEditing.resize",|
|"drag.cleanup",|
|"drag.init",|
|"drag.move",|
|"drag.start",|
|"editorActions.init",|
|"element.changed",|
|"element.click",|
|"element.dblclick",|
|"element.hover",|
|"element.marker.update",|
|"element.mousedown",|
|"element.mousemove",|
|"element.out",|
|"element.updateId",|
|"elements.changed",|
|"global-connect.canceled",|
|"global-connect.cleanup",|
|"global-connect.drag.canceled",|
|"global-connect.drag.ended",|
|"global-connect.end",|
|"global-connect.ended",|
|"global-connect.hover",|
|"global-connect.init",|
|"global-connect.out",|
|"hand.canceled",|
|"hand.end",|
|"hand.ended",|
|"hand.init",|
|"hand.move.canceled",|
|"hand.move.end",|
|"hand.move.ended",|
|"hand.move.move",|
|"i18n.changed",|
|"import.done",| import xml完成
|"import.parse.complete",|
|"import.render.complete",
|"import.render.start",
|"interactionEvents.createHit",
|"interactionEvents.updateHit",
|"keyboard.keydown",
|"keyboard.keyup",
|"lasso.canceled",
|"lasso.cleanup",
|"lasso.end",
|"lasso.ended",
|"lasso.move",
|"lasso.selection.canceled",
|"lasso.selection.end",
|"lasso.selection.ended",
|"lasso.selection.init",
|"lasso.start",
|"moddleCopy.canCopyProperties",
|"moddleCopy.canCopyProperty",
|"moddleCopy.canSetCopiedProperty",
|"palette.create",
|"palette.getProviders",
|"popupMenu.getProviders.align-elements",
|"popupMenu.getProviders.bpmn-replace",
|"popupMenu.open",
|"render.connection",
|"render.getConnectionPath",
|"render.getShapePath",
|"render.shape",
|"resize.cleanup",
|"resize.end",
|"resize.move",
|"resize.start",
|"root.set",
|"saveXML.start",
|"selection.changed",
|"shape.added",
|"shape.changed",
|"shape.move.cleanup",
|"shape.move.end",
|"shape.move.hover",
|"shape.move.init",
|"shape.move.move",
|"shape.move.out",
|"shape.move.rejected",
|"shape.move.start",
|"shape.remove",
|"shape.removed",
|"spaceTool.canceled",
|"spaceTool.cleanup",
|"spaceTool.end",
|"spaceTool.ended",
|"spaceTool.getMinDimensions",
|"spaceTool.move",
|"spaceTool.selection.canceled",
|"spaceTool.selection.cleanup",
|"spaceTool.selection.end",
|"spaceTool.selection.ended",
|"spaceTool.selection.init",
|"spaceTool.selection.move",
|"spaceTool.selection.start",
|"tool-manager.update"


