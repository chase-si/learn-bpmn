import React, { useState } from "react";

import BasicBpmn from './demos/basicBpmn'
import ModelerBpmn from './demos/modeler'
import ModelerPanelBpmn from './demos/modelerPanel'
import ModelerCustom from './demos/modelerCustom'
import ModelerCustomOverWrite from './demos/modelerCustomOverWrite'
import ModelerPanelDemo from './demos/modelerPanel'
import DevelopDemo from './modelerPanel'

const ROUTERS = [{
	name: '纯xml展示demo(官方)',
	component: () => <BasicBpmn />
}, {
	name: '带左边栏demo(官方)',
	component: () => <ModelerBpmn />
}, {
	name: '定制模块demo(官方)',
	component: () => <ModelerCustom />
}, {
	name: '带可编辑的demo(官方)',
	component: () => <ModelerPanelDemo />
}, {
	name: '定制模块demo',
	component: () => <ModelerCustomOverWrite />
}, {
	name: '带可编辑demo',
	component: () => <ModelerPanelBpmn />
}, {
	name: '开发demo',
	component: () => <DevelopDemo />
}]

const App = () => {
	const [route, setRoute] = useState(ROUTERS[0].name)

  	return (
	    <div>
			{ROUTERS.map(item => (
				<button key={item.name} onClick={() => setRoute(item.name)}>
					{item.name}
				</button>
			))}
			{ROUTERS.find(item => item.name === route).component()}
    	</div>
  	);
}

export default App;
