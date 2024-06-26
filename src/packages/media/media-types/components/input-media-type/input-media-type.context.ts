import type { UmbMediaTypeItemModel } from '../../repository/index.js';
import { UMB_MEDIA_TYPE_ITEM_REPOSITORY_ALIAS } from '../../repository/index.js';
import { UMB_MEDIA_TYPE_PICKER_MODAL } from '../../tree/media-type-picker-modal.token.js';
import { UmbPickerInputContext } from '@umbraco-cms/backoffice/picker-input';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbMediaTypePickerContext extends UmbPickerInputContext<UmbMediaTypeItemModel> {
	constructor(host: UmbControllerHost) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		super(host, UMB_MEDIA_TYPE_ITEM_REPOSITORY_ALIAS, UMB_MEDIA_TYPE_PICKER_MODAL);
	}
}
