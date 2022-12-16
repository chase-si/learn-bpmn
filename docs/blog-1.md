# bpnm 学习笔记(1)
项目初始化, 对官方提供的一些demo进行学习, 整理, 微调
## 前期准备
1.  该装的npm包都装上, 核心的包就是`bpmn-js`, 如果需要编辑流程参数等需求的话, 酌情根据官方demo引入别的包
   官方demo: https://github.com/bpmn-io/bpmn-js-examples
2.  该引入的对应css都引入
我是在全局总css内, 用css的引用方法引入的, 参考如下
```
@import url("../node_modules/bpmn-js/dist/assets/diagram-js.css");
@import url("../node_modules/bpmn-js/dist/assets/bpmn-js.css");
@import url("../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css");
@import url("../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css");
@import url("../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css");
/* 属性模板css */
@import url("../node_modules/bpmn-js-properties-panel/dist/assets/properties-panel.css");
```

## 基本显示
`file: src/demos/basicBpmn`

**核心代码**:
```
import BpmnJs from 'bpmn-js';
import { diagramXML } from './constants'; // xml的字符串

const bpmnViewer = new BpmnJs({
    container: ${绑定的dom} // 比如 "#container" 或者 react/vue里ref绑定的dom指向
})

bpmnViewer.importXML(diagramXML);
```

**添加import监听**:
```
bpmnViewer.current.on('import.done', event => {
    const { error, warnings } = event
    if (error) {
        return console.log('加载失败:', error)
    }
    return console.log('加载成功:', warnings);
})
```

## 带左边栏和可编辑
`file: src/demos/modeler`

**核心代码**:
```
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { diagramXML } from './constants'; // xml的字符串

const = new BpmnModeler({
    container: ${绑定的dom} // 比如 "#container" 或者 react/vue里ref绑定的dom指向
})

bpmnViewer.importXML(diagramXML);
```
基本同基本显示demo, 只不过`BpmnJS`换成了`BpmnModeler`

**打印输出**编辑后的xml的function:
```
// 把function绑定到click事件上触发即可, 注意`saveXML`是个promise异步
const prnNewXml = async () => {
    const res = await bpmnViewer.saveXML()
    console.log('new xml', res)
}
```
**下载为svg**, 和打印输出xml差不多
```
const prnNewSVG = async () => {
    const res = await bpmnModeler.current.saveSVG()
    const { svg } = res

    const aLink = document.createElement('a')
    aLink.href = `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(svg)}`
    aLink.download = 'test.svg'
    aLink.click()
}
```
## 带参数编辑的组件
`file:src/demos/modelerPanel`

**核心代码**, 加载之后每个小模块点中后可编辑其默认的属性, 有name,id, document之类的.
```
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';
import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'

import { diagramXML } from './constants'; // xml的字符串

const bpmnViewer = new BpmnModeler({
    container: ${绑定的xml渲染显示的dom},
    propertiesPanel: {
        parent: '${绑定的编辑面板显示的dom}, // 这个dom的布局位置自己记得写css控制一下, 此处略
    },
    additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
    ]
})
bpmnViewer.importXML(diagramXML);
```

**带拓展**: 
```
const bpmnViewer = new BpmnModeler({
    container: ${绑定的xml渲染显示的dom},
    propertiesPanel: {
        parent: '${绑定的编辑面板显示的dom}, // 这个dom的布局位置自己记得写css控制一下, 此处略
    },
    additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule, // 只引入到此就可带基本的编辑功能, 默认都带id和document属性
        ZeebePropertiesProviderModule // 此扩展增加了output和extension Properties
    ],
    moddleExtensions: {
        zeebe: ZeebeBpmnModdle
    }
})
```
