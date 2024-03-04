import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UmbExtensionApiInitializer } from '@umbraco-cms/backoffice/extension-api';
import type { MetaEntityActionFolderKind } from '@umbraco-cms/backoffice/extension-registry';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import type { UmbFolderRepository } from '@umbraco-cms/backoffice/tree';

export class UmbDeleteFolderEntityAction extends UmbEntityActionBase<MetaEntityActionFolderKind> {
	// TODO: make base type for item and detail models
	#folderRepository?: UmbFolderRepository;
	#init: Promise<unknown>;

	constructor(host: UmbControllerHost, args: UmbEntityActionArgs<MetaEntityActionFolderKind>) {
		super(host, args);

		// TODO: We should properly look into how we can simplify the one time usage of a extension api, as its a bit of overkill to take conditions/overwrites and observation of extensions into play here: [NL]
		// But since this happens when we execute an action, it does most likely not hurt any users, but it is a bit of a overkill to do this for every action: [NL]
		this.#init = Promise.all([
			new UmbExtensionApiInitializer(
				this._host,
				umbExtensionsRegistry,
				this.args.meta.folderRepositoryAlias,
				[this._host],
				(permitted, ctrl) => {
					this.#folderRepository = permitted ? (ctrl.api as UmbFolderRepository) : undefined;
				},
			).asPromise(),
		]);
	}

	async execute() {
		if (!this.args.unique) throw new Error('Unique is not available');
		await this.#init;

		const { data: folder } = await this.#folderRepository!.request(this.args.unique);

		if (folder) {
			// TODO: maybe we can show something about how many items are part of the folder?
			await umbConfirmModal(this._host, {
				headline: `Delete folder ${folder.name}`,
				content: 'Are you sure you want to delete this folder?',
				color: 'danger',
				confirmLabel: 'Delete',
			});

			await this.#folderRepository?.delete(this.args.unique);
		}
	}
}
