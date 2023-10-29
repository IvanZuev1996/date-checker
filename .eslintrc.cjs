module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-react', '@babel/preset-env']
        },
    },
    plugins: [
        'react',
        'react-hooks',
        'unused-imports',
        'import'
    ],
    rules: {
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.json', 'jsonc']
            }
        ],
        'no-unused-expressions': 'off',
        'react/jsx-indent': [2, 4],
        'import/no-unresolved': 'off',
        'consistent-return': 'off',
        'react/prop-types': 'off',
        quotes: [2, 'single'],
        'import/prefer-default-export': 'off',
        indent: [2, 4],
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent-props': [2, 4],
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'unused-imports/no-unused-imports': 'error',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'error',
        'react/no-array-index-key': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    'parent',
                    'sibling',
                    'object',
                    'type',
                    'index'
                ],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'builtin'
                    },
                    {
                        pattern: '@**',
                        group: 'external',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },
    overrides: [
        {
            files: ['*.json', '*.jsonc'],
            rules: {
                quotes: [2, 'double']
            }
        }
    ]
}
