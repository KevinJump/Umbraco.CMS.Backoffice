import { EntityTreeItemResponseModel } from '@umbraco-cms/backoffice/backend-api';
import type { UmbEntityTreeItemModel, UmbEntityTreeRootModel } from '@umbraco-cms/backoffice/tree';

export type UmbDocumentTreeItemModel = EntityTreeItemResponseModel & UmbEntityTreeItemModel;
export type UmbDocumentTreeRootModel = EntityTreeItemResponseModel & UmbEntityTreeRootModel;