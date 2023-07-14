import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/**/*.ts',
  ],
  outDir: "dist",
  dts: false,
  clean: true,
  format: ['esm'],
  minify: true,
  splitting: true,
})
