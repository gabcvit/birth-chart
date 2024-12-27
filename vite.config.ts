/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: '/birth-chart/',
	plugins: [vue()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/vitest.setup.ts'],
	}
})