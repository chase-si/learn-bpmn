import React, { useEffect, useRef, useState } from 'react';
import BpmnJs from 'bpmn-js';
import BpmnModeler from 'bpmn-js/lib/Modeler';

const ReactBpmn = (props) => {
    const {
        url, // xml的url
        diagramXML, // 直接的xml数据
        onLoading = (res) => console.log('loading log', res),
        onError  = (res) => console.log('error log', res),
        onShown = (res) => console.log('render log', res),
    } = props
    const [xmlState, setXmlState] = useState(null)
    const bpmnViewer = useRef(null)
    const containerDom = useRef(null)
    
    useEffect(() => {
        init()

        return () => {
            bpmnViewer.current?.destroy()
        }
    }, [])

    const init = () => {
        try {
            // 纯view
            bpmnViewer.current = new BpmnJs({
                container: containerDom.current
            })
            // view带编辑栏
            // bpmnViewer.current = new BpmnModeler({
            //     container: containerDom.current
            // })

            bpmnViewer.current.on('import.done', event => {
                const { error, warnings } = event
                if (error) {
                    return onError(error)
                }
                return onShown(warnings);
            })

            if (diagramXML) {
                displayXML(diagramXML);
                return
            }
    
            if (url) {
                fetchDiagram()
                return
            }

        } catch (error) {
            console.log('errr')   
        }
    }

    const fetchDiagram = async (url) => {
        try {
            onLoading()
            const fetchRes = await fetch(url)
            if (fetchRes) {
                const textRes = await fetchRes.text()
                if (textRes) {
                    setXmlState(textRes)
                    displayXML(textRes)
                } 
            }
        } catch (error) {
            onError(error)
        }
    }

    const displayXML = (xml) => {
        bpmnViewer.current?.importXML(xml);
    }

    return (
        <div
            className="bpmn-container"
            ref={containerDom}
            style={{
                width: '100vw',
                height: '100vh'
            }}
        />
    )
}

export default ReactBpmn