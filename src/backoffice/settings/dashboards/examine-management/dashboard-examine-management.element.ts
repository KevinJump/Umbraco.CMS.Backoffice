import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { IRoute, IRoutingInfo, path } from 'router-slot';

import { UmbDashboardExamineIndexElement } from './views/section-view-examine-indexers';
import { UmbDashboardExamineSearcherElement } from './views/section-view-examine-searchers';

import { UmbLitElement } from '@umbraco-cms/element';
import { UmbRouterSlotChangeEvent, UmbRouterSlotInitEvent } from '@umbraco-cms/router';

@customElement('umb-dashboard-examine-management')
export class UmbDashboardExamineManagementElement extends UmbLitElement {
	static styles = [
		css`
			a {
				color: var(--uui-color-text);
				background: transparent;
				border: none;
				text-decoration: underline;
				cursor: pointer;
				display: inline-block;
			}
		`,
	];
	@state()
	private _routes: IRoute[] = [
		{
			path: `/index/:indexerName`,
			component: () => import('./views/section-view-examine-indexers'),
			setup: (component: HTMLElement, info: IRoutingInfo) => {
				const element = component as UmbDashboardExamineIndexElement;
				element.indexName = info.match.params.indexerName;
			},
		},
		{
			path: `/searcher/:searcherName`,
			component: () => import('./views/section-view-examine-searchers'),
			setup: (component: HTMLElement, info: IRoutingInfo) => {
				const element = component as UmbDashboardExamineSearcherElement;
				element.searcherName = info.match.params.searcherName;
			},
		},
		{
			path: ``,
			component: () => import('./views/section-view-examine-overview'),
		},
	];

	@state()
	private _routerPath?: string;
	private _activePath?: string;


	render() {
		return html` ${this._activePath !== ''
				? html` <a href="${this._routerPath}/examine-management/"> &larr; Back to overview </a> `
				: nothing}
			<umb-router-slot
				.routes=${this._routes}
				@init=${(event: UmbRouterSlotInitEvent) => {
					this._routerPath = event.target.absoluteRouterPath;
				}}
				@change=${(event: UmbRouterSlotChangeEvent) => {
					this._activePath = event.target.localActiveViewPath;
				}}></umb-router-slot>`;
	}
}

export default UmbDashboardExamineManagementElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-dashboard-examine-management': UmbDashboardExamineManagementElement;
	}
}
