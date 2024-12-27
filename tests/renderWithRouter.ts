import type { RenderResult, RenderOptions } from '@testing-library/vue';
import { render } from '@testing-library/vue';
import type { RouteLocationRaw } from 'vue-router';
import router from '../src/router';

export default async function renderWithRouter(
	component: unknown,
	options?: RenderOptions<Record<string, unknown>>,
	route?: RouteLocationRaw,
): Promise<RenderResult> {
	const globalOptions = options ?? {};

	globalOptions.global = {
		plugins: [router],
		...globalOptions.global,
	};

	await router.push(route ?? '/');
	await router.isReady();

	return render(component, globalOptions);
}