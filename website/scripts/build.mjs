import { build } from 'vitepress'

// Run the static build and post-build SEO generation in one Node process so the
// build cannot leave a half-written dist directory on any platform.
await build()
await import('./postbuild.mjs')
