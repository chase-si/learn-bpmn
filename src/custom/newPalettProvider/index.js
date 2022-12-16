import PaletteModule from 'diagram-js/lib/features/palette';
import CreateModule from 'diagram-js/lib/features/create';
import SpaceToolModule from 'bpmn-js/lib/features/space-tool';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import HandToolModule from 'diagram-js/lib/features/hand-tool';
import GlobalConnectModule from 'diagram-js/lib/features/global-connect';
import translate from 'diagram-js/lib/i18n/translate';

import PaletteProvider from './PaletteProvider';

/**
 * 重写原生的左边栏, 同时支持新传入的自定义palette 如同paletteEntries
 * @param {*} paletteEntries array
 * paletteEntries demo:
	[{
		key: 'create.xiebo-task', // 自定义key
		type: 'bpmn:ServiceTask', // 基于某个原始模板的拓展
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
			}],
		}]
	}
 * @returns 
 */

const getPalette = (paletteEntries) => {
	return {
		__depends__: [
			PaletteModule,
			CreateModule,
			SpaceToolModule,
			LassoToolModule,
			HandToolModule,
			GlobalConnectModule,
			translate,
			{ paletteEntries: ['value', paletteEntries] }
		],
		__init__: ['paletteProvider'],
		paletteProvider: ['type', PaletteProvider]
	}
}

export default getPalette;
