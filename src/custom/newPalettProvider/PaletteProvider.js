import {
	assign
} from 'min-dash';
import { getDi } from 'bpmn-js/lib/util/ModelUtil';

import { getOriginalEntries } from './constants'

/**
 * A palette provider for BPMN 2.0 elements.
 */
export default function PaletteProvider(
	palette, create, elementFactory,
	spaceTool, lassoTool, handTool,
	globalConnect, translate, paletteEntries) {

	this._palette = palette;
	this._create = create;
	this._elementFactory = elementFactory;
	this._spaceTool = spaceTool;
	this._lassoTool = lassoTool;
	this._handTool = handTool;
	this._globalConnect = globalConnect;
	this._translate = translate;
	this._paletteEntries = paletteEntries;

	palette.registerProvider(this);
}

// 注入参数
PaletteProvider.$inject = [
	'palette',
	'create',
	'elementFactory',
	'spaceTool',
	'lassoTool',
	'handTool',
	'globalConnect',
	'translate',
	'paletteEntries'
];


PaletteProvider.prototype.getPaletteEntries = function (element) {
	var create = this._create,
		elementFactory = this._elementFactory,
		spaceTool = this._spaceTool,
		lassoTool = this._lassoTool,
		handTool = this._handTool,
		globalConnect = this._globalConnect,
		translate = this._translate,
		paletteEntries = this._paletteEntries;

	function createAction({
		type, group, iconClassName, title, options, iconUrl
	}) {

		function createListener(event) {
			var shape = elementFactory.createShape(assign({ type: type }, options));

			if (options) {
				var di = getDi(shape);
				di.isExpanded = options.isExpanded;
			}
			create.start(event, shape);
		}

		var shortType = type.replace(/^bpmn:/, '');
		
		var defaultProps = {
			group,
			title: translate(title) || translate('Create {type}', { type: shortType }),
			action: {
				dragstart: createListener,
				click: createListener
			}
		}

		if (iconClassName) {
			return {
				...defaultProps,
				className: iconClassName
			}
		}

		return {
			...defaultProps,
			imageUrl: iconUrl,
		};
	}

	function createSubprocess(event) {
		var subProcess = elementFactory.createShape({
			type: 'bpmn:SubProcess',
			x: 0,
			y: 0,
			isExpanded: true
		});

		var startEvent = elementFactory.createShape({
			type: 'bpmn:StartEvent',
			x: 40,
			y: 82,
			parent: subProcess
		});

		create.start(event, [subProcess, startEvent], {
			hints: {
				autoSelect: [subProcess]
			}
		});
	}

	function createParticipant(event) {
		create.start(event, elementFactory.createParticipantShape());
	}

	return getOriginalEntries({
		translate,
		handTool,
		lassoTool,
		spaceTool,
		globalConnect,
		createAction,
		createSubprocess,
		createParticipant,
		paletteEntries
	})
};
