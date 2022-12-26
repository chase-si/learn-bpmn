import React, { useEffect, useRef } from 'react'

import ReactBpmn from './reactBpmn';
import { diagramXML } from './constants';

const ModelerReactBpmn = () => {
    return (
        <div>
            <ReactBpmn
                diagramXML={diagramXML}
            />
        </div>
    )
}

export default ModelerReactBpmn