import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import type { UmbConditionConfigBase, UmbExtensionCondition } from '@umbraco-cms/backoffice/extension-api';

export class UmbConditionBase<ConditionConfigType extends UmbConditionConfigBase>
	extends UmbControllerBase
	implements UmbExtensionCondition
{
	public readonly config: ConditionConfigType;
	#permitted = false;
	public get permitted() {
		return this.#permitted;
	}
	public set permitted(value) {
		if (value === this.#permitted) return;
		this.#permitted = value;
		this.#onChange();
	}
	#onChange: () => void;

	constructor(args: { host: UmbControllerHost; config: ConditionConfigType; onChange: () => void }) {
		super(args.host);
		this.config = args.config;
		this.#onChange = args.onChange;
	}

	destroy() {
		super.destroy();
		(this.config as any) = undefined;
		(this.#onChange as any) = undefined;
	}
}
