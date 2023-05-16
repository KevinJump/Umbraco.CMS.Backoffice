import type { ManifestBase, ManifestWithLoader } from '../types';

export type ManifestLoaderType<T> = ManifestWithLoader<T> & {
	loader: () => Promise<T>;
};

export function isManifestLoaderType<T>(manifest: ManifestBase): manifest is ManifestLoaderType<T> {
	return typeof (manifest as ManifestLoaderType<T>).loader === 'function';
}