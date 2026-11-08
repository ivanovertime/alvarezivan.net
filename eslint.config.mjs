// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}, {
  // Generated dev/build artifacts must never feed the check pipeline.
  ignores: ['.wrangler/**', 'dist/**']
})
