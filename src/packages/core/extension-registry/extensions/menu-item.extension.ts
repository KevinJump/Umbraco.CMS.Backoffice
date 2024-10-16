import type { UmbMenuItemElement } from './menu-item-element.interface.js';
import type { ManifestWithDynamicConditions, ManifestElement } from '@umbraco-cms/backoffice/extension-api';

export interface ManifestMenuItem
	extends ManifestElement<UmbMenuItemElement>,
		ManifestWithDynamicConditions<UmbExtensionCondition> {
	type: 'menuItem';
	meta: MetaMenuItem;
}

export interface MetaMenuItem {
	label: string;
	menus: Array<string>;
	entityType?: string;
	icon?: string;
}

export interface ManifestMenuItemTreeKind extends ManifestMenuItem {
	type: 'menuItem';
	kind: 'tree';
	meta: MetaMenuItemTreeKind;
}

export interface MetaMenuItemTreeKind extends MetaMenuItem {
	treeAlias: string;
	hideTreeRoot?: boolean;
}

export interface ManifestMenuItemLinkKind extends ManifestMenuItem {
	type: 'menuItem';
	kind: 'link';
	meta: MetaMenuItemLinkKind;
}

export interface MetaMenuItemLinkKind extends MetaMenuItem {
	href: string;
}

export type UmbMenuItemExtensions = ManifestMenuItem | ManifestMenuItemTreeKind | ManifestMenuItemLinkKind;

declare global {
	interface UmbExtensionManifestMap {
		UmbMenuItemExtensions: UmbMenuItemExtensions;
	}
}
