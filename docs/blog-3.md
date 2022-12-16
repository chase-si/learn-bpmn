# bpnm 学习笔记(3)
自定义组件属性栏的编辑

## 整体设计
* 编辑流程属性设计, 斜波代表一个自定义流程组件
```
  +---------------+     load(1)                     +------------------------------+                        +---------------------+
  |               |          |                      |                              |                        |                     |
  |   left-bar    |          |                      |       xml-render             |                        |     property-edit   |
  |               |          |                      |                              |                        |                     |
  |               |          |                      |                              |                        |                     |
  |               |          |                      |                              |                        |                     |
  |               |          |                      |                              |                        |                     |
  |  +---------+  |          |                      |                              |                        |                     |
  |  |  xiebo  |  |<---------+                      |       +----------+           |                        |                     |
  |  |         |  |        click to add shape(2)    |       |     xiebo|           |  click to edit props(3)|                     |
  |  |         +--+------------------------------>  |       |          |-----------+--------------------->  |                     |
  |  |         |  |                                 |       |          |           |                        |                     |
  |  +---+-----+  |                                 |       |          |           |                        |                     |
  |               |                                 |       +----------+           |                        |                     |
  |               |                                 |             ↑                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  |               |                                 |             |                |                        |                     |
  +------+--------+                                 +-------------+----------------+                        +-----------+---------+
                                                                  ↑                                                    |
                                                                  |                                                    |
                                                                  |save to xml(5)                                      |
                                                                  |                                                    |
                                                                  |                                                    |
                                                                  |                                                    |
                                                                  |               save(4)                              |
                                                                 -+----------------------------------------------------+
```

* (1) 加载数据
** 接受新palett格式的数据, 约定RcProperties内为可编辑参数 [{key: "label名称斜波", value: '斜波描述内容'}]
** 调用init内的函数load到left-bar
* (2) 点击加载斜波task
** 通过监听`shape.added`的方式, 监听加载斜波
** 监听事件内通过`model.updatePropertites`将RcProperties更新到xml内
* (3) click聚焦xml-render面板内的斜波Task
** 如果有如果有RcProperties, 就在property-edit内渲染显示可编辑的参数
** 设置当前聚焦的task.element为当前编辑element(改变焦点或聚焦其他element时触发(4)update使用)
* (4) 当前聚焦的斜波Task blur
** 判断新click的element的ID === 当前element.id
* (5) 编辑完的数据save
** 更新xml内的(3)聚焦的task.element的xml(再次通过`model.updatePropertites`)


`file: src/demos/modelerPanelOverWrite`