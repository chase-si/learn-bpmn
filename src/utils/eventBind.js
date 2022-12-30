// modeler的事件绑定封装
const eventListenBind = ({
    modeler,
    eventName,
    successCallback,
    failedCallback
}) => {
    try {
        modeler.on(eventName, (e) => {
            successCallback(e)
        })    
    } catch (error) {
        console.log(`error happend when bind ${eventName}`, error)
        failedCallback(error)
    }
}

/**
 * 添加组件时
 * @param {
 *      modeler,    -> bpmn实例
 *      successCallback,  -> 成功的回调
 *      failerCallback
 * }  
 */
export const bindShapeAdded = ({
    modeler,
    successCallback,
    failerCallback
}) => {
    eventListenBind({
        modeler,
        eventName: 'shape.added',
        successCallback: (e) => {
            const target = e.element

            // 带有rcProperties属性的, 自动注册rcProperty到xml属性上
            setTimeout(() => {
                const model = modeler.get('modeling')
                
                if (target.rcProperties) {
                    target.rcProperties.forEach(prop => {
                        const { key, value } = prop
                        model.updateProperties(
                            target, 
                            { [key]: value }
                        )
                    });
                }

                // 自定义的条件组件, 自动带俩subProcess出现
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
                    // const newTaskShape2 = elementFactory.createShape({
                    //     type: 'bpmn:SubProcess',
                    //     isExpanded: true
                    // })
                    const [rootShape, startShape] = elementRegistry.getAll()
            
                    autoPlace.append(target, newTaskShape)

                    // setTimeout(() => {
                    //     autoPlace.append(target, newTaskShape2)
                    // }, 200)
                }

                // 自定义的条件组件, 自动带俩subProcess出现
                // if (target.type === 'bpmn:ParallelGateway') {
                //     const elementFactory = modeler.get('elementFactory')
                //     const elementRegistry = modeler.get('elementRegistry')
                //     const autoPlace = modeler.get('autoPlace')

                //     const newTaskShape = elementFactory.createShape({
                //         type: 'bpmn:SubProcess',
                //         isExpanded: true,
                //         rcProperties: [{
                //             key: 'name',
                //             value: 'true'
                //         }]
                //     })
                //     const newTaskShape2 = elementFactory.createShape({
                //         type: 'bpmn:SubProcess',
                //         isExpanded: true,
                //         rcProperties: [{
                //             key: 'name',
                //             value: 'false'
                //         }]
                //     })
                //     const [rootShape, startShape] = elementRegistry.getAll()

                //     autoPlace.append(target, newTaskShape)

                //     setTimeout(() => {
                //         autoPlace.append(target, newTaskShape2)
                //     }, 200)
                // }

            }, 200) // 加200延迟, 让shaped add结束后再绑定属性
        },
        failerCallback
    })
}

// import完成时绑定时间, 目前主要是移除logo
export const bindImportDone = ({
    modeler,
    successCallback,
    failerCallback
}) => {
    eventListenBind({
        modeler,
        eventName: 'shape.added',
        successCallback: (e) => {
            // 移除logo元素
            const bpmnLogo = document.querySelector('a.bjs-powered-by')
            if (bpmnLogo) {
                bpmnLogo.remove()
            }
        },
        failerCallback
    })
}

// 和C#的消息通讯 call back
// const handleMsg = (msg, cb) => {
//     console.log('msg', msg)
//     cb()
//     const { type, data } = msg?.data
//     if (type === '加载') {
//         init(data)
//     }

//     if (type === '获取XML') {
//         window.postMessage(prnNewXml())
//     }
// }