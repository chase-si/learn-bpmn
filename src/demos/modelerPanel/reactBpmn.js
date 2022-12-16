import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';

import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'

import { Container } from './style';

// 基于modeler的模板, 显示编辑property panel
const ReactBpmn = (props) => {
    const {
        url, // xml的url
        diagramXML, // 直接的xml数据
        onLoading = (res) => console.log('loading log', res),
        onError  = (res) => console.log('error log', res),
        onShown = (res) => console.log('render log', res),
    } = props
    const bpmnModeler = useRef(null)
    const canvasDom = useRef(null)
    
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
                container: canvasDom.current,
                propertiesPanel: {
                    parent: '#js-properties-panl'
                },
                additionalModules: [
                    BpmnPropertiesPanelModule,
                    BpmnPropertiesProviderModule,
                    ZeebePropertiesProviderModule
                ],
                moddleExtensions: {
                    zeebe: ZeebeBpmnModdle
                }
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
                return onShown(importRes.warnings)
            }
        } catch (error) {
            console.log('errr')   
        }
    }

    // 输出编辑完的xml
    const prnNewXml = async () => {
        const res = await bpmnModeler.current.saveXML()
        console.log(res?.xml)
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
            </div>

            <div id="container" className="canvas" ref={canvasDom}></div>
            <div className="properties-panel-parent" id="js-properties-panl"></div>
        </Container>
    )
}

export default ReactBpmn