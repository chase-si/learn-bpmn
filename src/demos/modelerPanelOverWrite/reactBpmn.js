import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import Viewer from 'bpmn-js/lib/Viewer'

import getPalette from '../../custom/newPalettProvider'
import getContextPad from '../../custom/newContextPad'
import { bindShapeAdded, bindImportDone } from '../../utils/eventBind'
import { XieBoPalett } from './constants'
import { Container, PropertiesPanel } from './style'

// 基于modeler的模板, 显示编辑property panel
const ReactBpmn = (props) => {
    const {
        url, // xml的url
        diagramXML, // 直接的xml数据
        onLoading = (res) => console.log('loading log', res),
        onError = (res) => console.log('error log', res),
        onShown = (res) => console.log('render log', res),
    } = props
    const bpmnModeler = useRef(null)
    const canvasDom = useRef(null)

    const eleRef = useRef(null) // 内存放一个当前编辑的element
    const editDatasRef = useRef(null) // 内存放一个当前处理的editDatasRef
    const [editDatas, setEditDatas] = useState({})  // 目前编辑栏正在处理的数据

    useEffect(() => {
        init()

        return () => {
            bpmnModeler.current?.destroy()
        }
    }, [])

    const init = async () => {
        try {
            const newModelingModules = [...BpmnModeler.prototype._modelingModules]
            newModelingModules.splice(19, 1, getPalette([XieBoPalett]))
            newModelingModules.splice(8, 1, getContextPad([XieBoPalett]))

            // bpmn挂载到DOM上初始化
            bpmnModeler.current = new BpmnModeler({
                container: canvasDom.current,
                modules: [
                    ...Viewer.prototype._modules,
                    ...BpmnModeler.prototype._interactionModules,
                    ...newModelingModules
                ],
            })

            bindImportDone({
                modeler: bpmnModeler.current,
                failedCallback: (error) => onError(error)
            })

            const importRes = await bpmnModeler.current.importXML(diagramXML)
            // 有warnings就是正常渲染出来了
            if (importRes?.warnings) {
                onShown(importRes.warnings)
            }

            // 此方法可查看所有的可监听事件类型
            console.log(bpmnModeler.current.get('eventBus')._listeners)

            // 监听元素变化
            // bpmnModeler.current.on('element.changed', (event) => {
            //     console.log('element', event.element, ' changed')
            // })

            bindShapeAdded({
                modeler: bpmnModeler.current
            })

            bpmnModeler.current.on('element.click', (event) => {
                const { element } = event
                if (eleRef?.current?.id && (element?.id !== eleRef?.current?.id)) {
                    // 切换聚焦元素了
                    // 更新之前编辑元素的attrs
                    const model = bpmnModeler.current.get('modeling')
                    model.updateProperties(
                        eleRef.current,
                        editDatasRef.current
                    )
                }

                handleEditDatas(element)
                eleRef.current = element
            })
        } catch (error) {
            console.log('errr', error)
        }
    }

    // 输出编辑完的xml
    const prnNewXml = async () => {
        const res = await bpmnModeler.current.saveXML()
        console.log(res?.xml)
        return res.xml
    }

    // 输出编辑完的svg
    const prnNewSVG = async () => {
        const res = await bpmnModeler.current.saveSVG()
        const { svg } = res

        const aLink = document.createElement('a')
        aLink.href = `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(svg)}`
        aLink.download = 'test.svg'
        aLink.click()
    }

    // 高亮流程控件
    const highLight = () => {
        const dataEles = document.querySelectorAll('g[data-element-id]')
        const taskElesIds = []
        dataEles.forEach(item => {
            console.dir(item)
            if (item.dataset.elementId?.includes('Activity')) {
                taskElesIds.push(item.dataset.elementId)
            }
        })
        if (taskElesIds.length === 0) {
            alert('没有可高亮的执行流程组件')
            return
        }
        const highLightEle = document.querySelector(`g[data-element-id=${taskElesIds[0]}]`)
        highLightEle.classList.add('hcActive')
        highLightEle.querySelector('rect').style.stroke = 'red'
    }

    const handlePropsChanged = (e) => {
        const { name, value } = e.target
        const newData = {
            ...editDatas,
            [name]: value
        }

        setEditDatas(newData)
        editDatasRef.current = newData
    }

    const handleEditDatas = (element) => {
        const renderFlag = element?.rcEditable
            && element?.rcProperties
            && element?.businessObject.$attrs

        if (renderFlag) {
            const renderDatas = element.businessObject.$attrs || {}
            setEditDatas(renderDatas)
            editDatasRef.current = renderDatas
        } else {
            editDatasRef.current = {}
            setEditDatas({})
        }
    }

    return (
        <Container>
            {/* test button */}
            <div className="buttons">
                <button className="print" onClick={prnNewXml}>
                    输出xml
                </button>
                <button className="print" onClick={prnNewSVG}>
                    输出svg
                </button>
                <button className="print" onClick={highLight}>
                    高亮流程控件
                </button>
            </div>

            <div id="container" className="canvas" ref={canvasDom} />

            {/* 加上className为了获得颜色变量  */}
            {!!Object.entries(editDatas).length &&
                (<PropertiesPanel
                    className="djs-container"
                >
                    {Object.entries(editDatas).map(props => (
                        <div key={props[0]} className="row">
                            <div className="label">
                                {props[0]}
                            </div>
                            <input
                                name={props[0]}
                                type="text"
                                value={props[1]}
                                onChange={handlePropsChanged}
                            />
                        </div>
                    ))}
                </PropertiesPanel>)}
        </Container >
    )
}

export default ReactBpmn