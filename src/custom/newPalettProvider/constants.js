const getOriginalEntries = ({
    translate,
    handTool,
    lassoTool,
    spaceTool,
    globalConnect,
    createAction,
    createSubprocess,
    createParticipant,
    paletteEntries = []// 累计拼接进来的新流程组件
}) => {
    const DEFAULT_TOOLS_ENTRIES = {
        'hand-tool': { // 小手
            group: 'tools',
            className: 'bpmn-icon-hand-tool',
            title: translate('Activate the hand tool'),
            action: {
                click: function (event) {
                    handTool.activateHand(event);
                }
            }
        },
        'lasso-tool': { // 多选框
            group: 'tools',
            className: 'bpmn-icon-lasso-tool',
            title: translate('Activate the lasso tool'),
            action: {
                click: function (event) {
                    lassoTool.activateSelection(event);
                }
            }
        },
        // 'space-tool': { // 改间隔的小工具, 废柴
        //     group: 'tools',
        //     className: 'bpmn-icon-space-tool',
        //     title: translate('Activate the create/remove space tool'),
        //     action: {
        //         click: function (event) {
        //             spaceTool.activateSelection(event);
        //         }
        //     }
        // },
        'global-connect-tool': { // 链接工具
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('Activate the global connect tool'),
            action: {
                click: function (event) {
                    globalConnect.start(event);
                }
            }
        },
        'tool-separator': { // 分隔符
            group: 'tools',
            separator: true
        },
    }

    const JSON = [{
        key: 'create.start-event',
        type: 'bpmn:StartEvent',
        group: 'event',
        iconClassName: 'bpmn-icon-start-event-none',
        title: '创建开始事件',
        show: true,
        options: {
            name: "开始"
        }
    }, {
        key: 'create.intermediate-event',
        type: 'bpmn:IntermediateThrowEvent',
        group: 'event',
        iconClassName: 'bpmn-icon-intermediate-event-none',
        title: '创建中间/边界事件',
        show: false
    }, {
        key: 'create.end-event',
        type: 'bpmn:EndEvent',
        group: 'event',
        iconClassName: 'bpmn-icon-end-event-none',
        title: '创建结束事件',
        show: true
    }, {
        key: 'create.exclusive-gateway',
        type: 'bpmn:ExclusiveGateway',
        group: 'gateway',
        iconClassName: 'bpmn-icon-gateway-none',
        title: '创建出入口',
        show: false
    }, {
        key: 'create.task',
        type: 'bpmn:Task',
        group: 'activity',
        iconClassName: 'bpmn-icon-task',
        title: '创建任务',
        show: true
    }, {
        key: 'create.data-object',
        type: 'bpmn:DataObjectReference',
        group: 'data-object',
        iconClassName: 'bpmn-icon-data-object',
        title: '创建DataObjectReference',
        show: false
    }, {
        key: 'create.data-store',
        type: 'bpmn:DataStoreReference',
        group: 'data-store',
        iconClassName: 'bpmn-icon-data-store',
        title: '创建DataStoreReference',
        show: false
    }, {
        key: 'create.group',
        type: 'bpmn:Group',
        group: 'artifact',
        iconClassName: 'bpmn-icon-group',
        title: '创建组',
        show: false
    }]

    const getEntriesFromJSONArr = (json) => {
        const jsonArr = json
            .filter(item => item.show)
            .map(item => {
                const { key, type, group, iconClassName, iconUrl, title, options } = item
                return [
                    key,
                    createAction({
                        type,
                        group,
                        iconClassName,
                        iconUrl,
                        title,
                        options
                    })
                ]
            })
        
        return Object.fromEntries(jsonArr)
    }


    return {
        ...DEFAULT_TOOLS_ENTRIES,
        ...getEntriesFromJSONArr(JSON),
        ...getEntriesFromJSONArr(paletteEntries),
        'create.subprocess-expanded': {
            group: 'activity',
            className: 'bpmn-icon-subprocess-expanded',
            title: translate('Create expanded SubProcess'),
            action: {
                dragstart: createSubprocess,
                click: createSubprocess
            }
        },
        // 'create.participant-expanded': {
        //     group: 'collaboration',
        //     className: 'bpmn-icon-participant',
        //     title: translate('Create Pool/Participant'),
        //     action: {
        //         dragstart: createParticipant,
        //         click: createParticipant
        //     }
        // }
    }
}


export {
    getOriginalEntries
}
