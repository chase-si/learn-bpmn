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
