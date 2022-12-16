import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import Container from './style'

// 基于展示的基础, 增加控制栏的渲染, 同时可输出编辑完的xml
const ReactBpmn = (props) => {
    const {
        url, // xml的url
        diagramXML, // 直接的xml数据
        onLoading = (res) => console.log('loading log', res),
        onError  = (res) => console.log('error log', res),
        onShown = (res) => console.log('render log', res),
    } = props
    const [xmlState, setXmlState] = useState(diagramXML)
    const bpmnModeler = useRef(null)
    const containerDom = useRef(null)
    
    useEffect(() => {
        init()

        return () => {
            bpmnModeler.current?.destroy()
        }
    }, [])

    const init = async () => {
        try {
            // bpmn挂载到DOM上初始化
            bpmnModeler.current = new BpmnModeler({
                container: containerDom.current,
                additionalModules: [{
                    // translate: [ 'value', customTranslate ],
                    // paletteProvider: ['value', newPl]
                }]
            })

            bpmnModeler.current.on('import.done', (event) => {
                if (event?.error) {
                    return onError(event.error)
                }
                // 移除logo元素
                const bpmnLogo = document.querySelector('a.bjs-powered-by')
                if (bpmnLogo) {
                    bpmnLogo.remove()
                }
            })

            const importRes = await bpmnModeler.current.importXML(diagramXML)
            // 有warnings就是正常渲染出来了
            if (importRes?.warnings) {
                onShown(importRes.warnings)
            }

            bpmnModeler.current.on('element.click', (event) => {
                console.log('element', event.element, ' clicked')

            })

            // 此方法可查看所有的可监听事件类型
            // console.log(bpmnModeler.current.get('eventBus')._listeners)

            // 监听元素变化
            // bpmnModeler.current.on('element.changed', (event) => {
            //     console.log('element', event.element, ' changed')
            // })
        } catch (error) {
            console.log('errr', error)   
        }
    }

    // 输出编辑完的xml
    const prnNewXml = async () => {
        const res = await bpmnModeler.current.saveXML()
        console.log('new xml', res)
    }

    return (
        <Container>
            <div id="container" ref={containerDom} />

            <button className="print" onClick={prnNewXml}>
                输出xml
            </button>
        </Container>
    )
}

export default ReactBpmn