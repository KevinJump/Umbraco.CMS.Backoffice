import { css, html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbCollectionContext } from '@umbraco-cms/backoffice/collection';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import type { FolderTreeItemResponseModel } from '@umbraco-cms/backoffice/backend-api';
import type { ManifestWorkspaceViewCollection } from '@umbraco-cms/backoffice/extension-registry';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';

import '../../../../collection/dashboards/dashboard-collection.element.js';

@customElement('umb-workspace-view-collection')
export class UmbWorkspaceViewCollectionElement extends UmbLitElement {
	public manifest!: ManifestWorkspaceViewCollection;

	private _workspaceContext?: typeof UMB_WORKSPACE_CONTEXT.TYPE;

	// TODO: add type for the collection context.
	private _collectionContext?: UmbCollectionContext<FolderTreeItemResponseModel, any>;

	constructor() {
		super();

		this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {
			this._workspaceContext = nodeContext;
		});
	}

	render() {
		// TODO: figure out what the collection to render
		return html`<umb-collection></umb-collection>`;
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
			}
		`,
	];
}

export default UmbWorkspaceViewCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-view-collection': UmbWorkspaceViewCollectionElement;
	}
}
