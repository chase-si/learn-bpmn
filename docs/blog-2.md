# bpnm 学习笔记(2)
改造, 覆写官方提供的demos甚至库代码, 实现可定制化的流程组件编辑
实现:
1. 去掉logo
2. 左侧边栏`palette`自定义初始化组件 / 增加自定义组件
3. 组件弹窗`contextPad`自定义可连接初始化组件 / 增加自定义组件
4. `contextPad`的添加方向改为向下

`file: src/demos/modelerCustomOverWrite`
## 去掉logo
官方自带logo, 查看dom发现挂在一个a元素上, 我们在import xml完成后, 直接找到那个元素remove即可
```
bpmnModeler.on('import.done', (event) => {
    if (event?.error) {
        return onError(event.error)
    }
    // 移除logo元素
    const bpmnLogo = document.querySelector('a.bjs-powered-by')
    if (bpmnLogo) {
        bpmnLogo.remove()
    }
})
```

## 自定义左边栏流程组件
官方提供了demo讲解如何自定义化组件:
https://github.com/bpmn-io/bpmn-js-example-custom-controls
引入实现了一下:
`file: src/demos/modelerCustom`

同时有一个bpmn中文学习文档里讲这个也比较透彻:
https://github.com/LinDaiDai/bpmn-chinese-document/blob/master/LinDaiDai/%E5%85%A8%E7%BD%91%E6%9C%80%E8%AF%A6bpmn.js%E6%95%99%E6%9D%90-%E8%87%AA%E5%AE%9A%E4%B9%89palette%E7%AF%87.md

但是, 这两个讲的都是新增自定义化组件, 但是我连**初始化自带**的组件都想删除, 研究了一番决定覆写他左侧边栏的加载代码.

### 覆盖原来的Modeler代码(how)
怎么做先写前面, 为什么这么做见下一个小标题
1. 把`/node_modules/bpmn-js/lib/features/palette`文件夹复制出来, 自定义个文件夹名字, 比如`newPalette`, 复制出的过程中, 记得palette文件内的相对路径引用要改成绝对路径的
2. 覆盖替换原库中代码模块
```
import newPalette from './newPalette'

const newModelingModules = [...BpmnModeler.prototype._modelingModules]
newModelingModules.splice(19, 1, newPalette) // 替换原来的palette

const bpmnModeler = new BpmnModeler({
    container: canvasDom.current,
    modules: [
        ...Viewer.prototype._modules,
        ...BpmnModeler.prototype._interactionModules,
        ...newModelingModules
    ]
})
```
3. 对newPalette里的一些代码做操作, 会发现左侧边栏会有变化, 在此我们可以多尝试调试帮助理解代码, 具体做哪些操作请看以下

### 阅读我们的Modeler代码(why)
点击我们的`BpmnModeler`直接跳进`node_modules/bpmn-js/lib/Modeler.js`, 发现其有三部分组成
```
Modeler.prototype._modules = [].concat(
	Viewer.prototype._modules,
	Modeler.prototype._interactionModules,
	Modeler.prototype._modelingModules
);
```
而其中的第三部分`_modelingModules中`, `paletteModule`就是负责左边边栏渲染的
```
Modeler.prototype._modelingModules = [
	// modeling components
	AlignElementsModule,
	AutoPlaceModule,
	AutoScrollModule,
	AutoResizeModule,
	BendpointsModule,
	ConnectModule,
	ConnectionPreviewModule,
	ContextPadModule,
	CopyPasteModule,
	CreateModule,
	DistributeElementsModule,
	EditorActionsModule,
	GridSnappingModule,
	InteractionEventsModule,
	KeyboardModule,
	KeyboardMoveSelectionModule,
	LabelEditingModule,
	ModelingModule,
	MoveModule,
	PaletteModule, // <============================ 这里
	ReplacePreviewModule,
	ResizeModule,
	SnappingModule,
	SearchModule
];
```
从`paletteModule`进到`node_modules/bpmn-js/lib/features/palette/PaletteProvider.js`, 看到有如下代码:
```
assign(actions, {
    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      title: translate('Activate the hand tool'),
      action: {
        click: function(event) {
          handTool.activateHand(event);
        }
      }
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: translate('Activate the lasso tool'),
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    ...
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
      translate('Create StartEvent')
    ),
    ...
}
```
拿第一个**工具图标**来看
```
'hand-tool': {
    group: 'tools',
    className: 'bpmn-icon-hand-tool',
    title: translate('Activate the hand tool'), // 这里是悬浮在icon上显示的文本, 需要汉化的直接改中文的就可
    action: {
    click: function(event) {
        handTool.activateHand(event);
      }
    }
},
```
`hand-tool`显然就是左侧边栏的第一个小手图标, 对其各个属性进行猜测与测试验证:

`className` 代表图标的icon, bpmn是用style实现icon样式, 同时我发现`node_modules/diagram-js/lib/features/palette/Palette.js`中, 他有的对`imageUrl`属性的支持的, 所以如果传入图片路径给`imageUrl`, 可以实现icon替换

`title`就是hover时显示的文本, 需要汉化的直接这里改了拉倒

`action`代表触发事件, 此处未对他原来支持的action深究, 现阶段直接套用即可


拿后面的**任务图标**来看
```
'create.task': createAction(
  'bpmn:Task', 'activity', 'bpmn-icon-task',
  translate('Create Task')
),
```
这里就是我们大展手脚**添加自定义组件**的地方了, 只要对key`create.task`动动手脚, 我可以创出多个类似task图标的流程组件,
比如添加
```
'create.task2': createAction(
  'bpmn:Task', 'activity', 'bpmn-icon-task',
  translate('Create Task 2号')
),
```
会发现左边栏多了一个长得一样又不完全一致的task icon

目前代码中对组件type的定义比较全的可看`/bpmn-js/lib/features/replace/ReplaceOptions.js`

至于**删除初始组件**, 直接把初始列表里不要的注释掉就行.

写到这里, 接下来就可以把自定义组件的参数JSON化, 作为入参在初始化Modeler加载, 过程不表了. 最终代码可看`file: src/demos/modelerCustomOverWrite`

## 自定义menu菜单(点中xml渲染图中组件后, 显示的可接着添加的组件列表)
核心思想和替换PaletteModule类似

```
Modeler.prototype._modelingModules = [
	// modeling components
	AlignElementsModule,
	AutoPlaceModule,
	AutoScrollModule,
	AutoResizeModule,
	BendpointsModule,
	ConnectModule,
	ConnectionPreviewModule,
	ContextPadModule,  // <============================ 管事的在这里
	CopyPasteModule,
	CreateModule,
	DistributeElementsModule,
	EditorActionsModule,
	GridSnappingModule,
	InteractionEventsModule,
	KeyboardModule,
	KeyboardMoveSelectionModule,
	LabelEditingModule,
	ModelingModule,
	MoveModule,
	PaletteModule,
	ReplacePreviewModule,
	ResizeModule,
	SnappingModule,
	SearchModule
];
```

从`node_modules/diagram-js/lib/features/centext-pad`复制代码出来替换, 过程略了

## menu(contextPad)的添加方向改为向下
默认的添加方向是在右侧, 源代码还考虑到了添加多个组件做布局适配, 不建议修改. 
如果要修改, 相关代码在:
`/node_modules/bpmn-js/lib/features/auto-place/BpmnAutoPlaceUtil.js`

```
+  // var position = {
+  //   x: sourceTrbl.right + horizontalDistance + element.width / 2,
+  //   y: sourceMid.y + getVerticalDistance(orientation, minDistance)
+  // };
+  // chase change: add to bottom position
   var position = {
-    x: sourceTrbl.right + horizontalDistance + element.width / 2,
-    y: sourceMid.y + getVerticalDistance(orientation, minDistance)
+    x: sourceMid.x + getVerticalDistance(orientation, minDistance),
+    y: sourceTrbl.bottom + horizontalDistance + element.height / 2,
   };
```

这个文件的在原来的代码库里相关引用比较多, 没法像上面的`PaletteModule`和`ContextPadModule`两个模块一样拖出来重写, 所以用了`patch-package`直接覆盖修改了node_modules包里的几行代码.
