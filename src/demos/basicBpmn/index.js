import React from "react";

import ReactBpmn from "./reactBpmn";
import { diagramXML } from './constants';

// 简单的xml展示demo
const Bpmn = () => {
    return (
        <ReactBpmn
            diagramXML={diagramXML}
        />
    )    
}

export default Bpmn