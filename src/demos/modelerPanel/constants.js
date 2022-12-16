export const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"
  xmlns:magic="http://magic"
  id="sample-diagram"
  targetNamespace="http://bpmn.io/schema/bpmn"
>
  
  <bpmn2:process id="Process_1">
    <bpmn2:startEvent id="StartEvent_1" />
  </bpmn2:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`

export const XieBoPalett = {
	key: 'create.xiebo-task',
	type: 'bpmn:ServiceTask',
	group: 'activity',
	iconClassName: 'bpmn-icon-service-task',
	title: '创建斜波任务',
  show: true,
  options: {
    rcEditable: true, // 标识是否有可编辑参数
    rcProperties: [{
      key: '斜波',
      value: '斜波描述',
    }, {
      key: 'isvisable',
      value: '从不',
    }, {
      key: 'timingType',
      value: '从不',
    }, {
      key: 'time',
      value: '325',
    }, {
      key: 'wapeShape',
      value: 'quare',
    }, {
      key: 'channelID',
      value: '22',
    }, {
      key: 'controlMode',
      value: 'chase created',
    }, {
      key: 'absEndVal',
      value: 'chase created',
    }, {
      key: 'curControlMode',
      value: 'chase created',
    }, {
      key: 'advance',
      value: ''
    }],
  },
}

const xieboParams = {
  "Common": {
    "uuid": "9d7c2cd0-d086-4c22-acf8-66139608bd28",
    "group": "控制命令库",
    "sort": 5,
    "type": "command",
    "isEnable": true,
    "showName": "斜波",
    "desc": "这里是描述",
    "f1Index": null
  },
  "schedule": {
    "isvisable": {
      "value": "从不",
      "type": "常量",
      "unit": "mm",
      "isCheck": null
    },
    "timingType": {
      "value": "从不",
      "type": "变量",
      "unit": null,
      "isCheck": null
    },
    "time": {
      "value": 325,
      "type": "变量",
      "unit": "sec",
      "isCheck": null
    },
    "wapeShape": {
      "value": "quare",
      "type": "常量",
      "unit": null,
      "isCheck": null
    }
  },
  "channel": {
    "channelID": {
      "value": 22,
      "type": "常量",
      "unit": null,
      "isCheck": null
    },
    "controlMode": {
      "value": [ "1", "2" ],
      "type": "常量",
      "unit": null,
      "isCheck": null
    },
    "absEndVal": {
      "value": 3,
      "type": "常量",
      "unit": "mm",
      "isCheck": null
    },
    "curControlMode": {
      "value": "稳定位移",
      "type": "常量",
      "unit": null,
      "isCheck": null
    }
  },
  "advance": {
    "param1": {
      "value": true,
      "type": "常量",
      "unit": null,
      "isCheck": null
    },
    "param2": {
      "value": true,
      "type": "常量",
      "unit": null,
      "isCheck": null
    },
    "param3": {
      "value": true,
      "type": "常量",
      "unit": null,
      "isCheck": null
    }
  }
}