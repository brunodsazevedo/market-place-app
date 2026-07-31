import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import { reactConfig } from 'eslint-config-brunoazevedo'

const gitignorePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '.gitignore',
)

export default [
  ...reactConfig,
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      'no-console': 'off',
    },
  },
]
