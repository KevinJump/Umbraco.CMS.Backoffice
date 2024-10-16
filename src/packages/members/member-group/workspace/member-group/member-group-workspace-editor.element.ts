import { UMB_MEMBER_GROUP_ROOT_WORKSPACE_PATH } from '../../paths.js';
import { UMB_MEMBER_GROUP_WORKSPACE_CONTEXT } from './member-group-workspace.context-token.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, property, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement, umbFocus } from '@umbraco-cms/backoffice/lit-element';
import type { ManifestWorkspace } from '@umbraco-cms/backoffice/workspace';
import type { UUIInputElement } from '@umbraco-cms/backoffice/external/uui';
import { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';

@customElement('umb-member-group-workspace-editor')
export class UmbMemberGroupWorkspaceEditorElement extends UmbLitElement {
	@property({ attribute: false })
	manifest?: ManifestWorkspace;

	@state()
	private _name = '';

	@state()
	private _unique?: string;

	#workspaceContext?: typeof UMB_MEMBER_GROUP_WORKSPACE_CONTEXT.TYPE;

	constructor() {
		super();

		this.consumeContext(UMB_MEMBER_GROUP_WORKSPACE_CONTEXT, (workspaceContext) => {
			this.#workspaceContext = workspaceContext;
			if (!this.#workspaceContext) return;
			this.observe(this.#workspaceContext.name, (name) => (this._name = name ?? ''));
			this.observe(this.#workspaceContext.unique, (unique) => (this._unique = unique ?? undefined));
		});
	}

	// TODO. find a way where we don't have to do this for all Workspaces.
	#onInput(event: UUIInputEvent) {
		if (event instanceof UUIInputEvent) {
			const target = event.composedPath()[0] as UUIInputElement;

			if (typeof target?.value === 'string') {
				this.#workspaceContext?.setName(target.value);
			}
		}
	}

	#renderActions() {
		// Actions only works if we have a valid unique.
		if (!this._unique || this.#workspaceContext?.getIsNew()) return nothing;

		return html`<umb-workspace-entity-action-menu slot="action-menu"></umb-workspace-entity-action-menu>`;
	}

	override render() {
		return html`
			<umb-workspace-editor alias="Umb.Workspace.MemberGroup" back-path=${UMB_MEMBER_GROUP_ROOT_WORKSPACE_PATH}>
				${this.#renderActions()}
				<div id="header" slot="header">
					<uui-input id="nameInput" .value=${this._name} @input="${this.#onInput}" ${umbFocus()}></uui-input>
				</div>
				<umb-workspace-entity-action-menu slot="action-menu"></umb-workspace-entity-action-menu>
			</umb-workspace-editor>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
			#header {
				display: flex;
				align-items: center;
				width: 100%;
			}
			uui-input {
				width: 100%;
			}
		`,
	];
}

export default UmbMemberGroupWorkspaceEditorElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-member-group-workspace-editor': UmbMemberGroupWorkspaceEditorElement;
	}
}
