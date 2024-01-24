import { UmbStylesheetTreeItemModel } from '../../tree/types.js';
import { UmbModalToken, UmbPickerModalValue, UmbTreePickerModalData } from '@umbraco-cms/backoffice/modal';

export type UmbStylesheetPickerModalData = UmbTreePickerModalData<UmbStylesheetTreeItemModel>;
export type UmbStylesheetPickerModalValue = UmbPickerModalValue;

export const UMB_STYLESHEET_PICKER_MODAL = new UmbModalToken<
	UmbStylesheetPickerModalData,
	UmbStylesheetPickerModalValue
>('Umb.Modal.TreePicker', {
	modal: {
		type: 'sidebar',
		size: 'small',
	},
	data: {
		treeAlias: 'Umb.Tree.Stylesheet',
	},
});
