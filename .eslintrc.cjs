module.exports = {
    extends: [
        'plugin:vue/strongly-recommended',
        '@vue/airbnb',
        'plugin:import/typescript',
        'plugin:import/recommended',

    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    plugins: [
        '@typescript-eslint',
        '@stylistic/js',
        'import',
    ],
    rules: {
        'vue/block-order': ['error', {
            order: ['script', 'template', 'style'],
        }],
        'vue/script-indent': ['error', 2, { baseIndent: 1 }],
        'vue/html-self-closing': ['error', {
            html: {
                void: 'never',
                normal: 'always',
                component: 'always'
            },
            svg: 'always',
            math: 'always'
        }],
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/max-attributes-per-line': ['error', {
            singleline: { max: 3 },
            multiline: { max: 1 }
        }],
        'vue/order-in-components': ['error', {
            order: [
                'el',
                'name',
                'key',
                'parent',
                'functional',
                ['delimiters', 'comments'],
                ['components', 'directives', 'filters'],
                'extends',
                'mixins',
                ['provide', 'inject'],
                'ROUTER_GUARDS',
                'layout',
                'middleware',
                'validate',
                'scrollToTop',
                'transition',
                'loading',
                'inheritAttrs',
                'model',
                ['props', 'propsData'],
                'emits',
                'setup',
                'asyncData',
                'data',
                'fetch',
                'head',
                'computed',
                'watch',
                'watchQuery',
                'LIFECYCLE_HOOKS',
                'methods',
                ['template', 'render'],
                'renderError'
            ]
        }],
        'vue/no-irregular-whitespace': ['error', {
            skipStrings: true,
            skipComments: false,
            skipRegExps: false,
            skipTemplates: false,
            skipHTMLAttributeValues: false,
            skipHTMLTextContents: false
        }],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/match-component-file-name': ['error', {
            extensions: ['vue'],
            shouldMatchCase: false
        }],
        'vue/no-dupe-keys': ['error', {
            groups: []
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
            registeredComponentsOnly: true
        }],
        'vue/define-macros-order': ['error', {
            order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/object-shorthand': [
            'error',
            'always',
            {
                avoidQuotes: true,
                ignoreConstructors: false,
            },
        ],
        'vue/arrow-spacing': ['error', { after: true, before: true }],
        'vue/block-spacing': ['error', 'always'],
        'vue/template-curly-spacing': 'error',
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/no-useless-v-bind': 'error',
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/multi-word-component-names': 'off',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/max-len': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-v-model-argument': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
        'vue/attributes-order': ['error', {
            order: [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ],
            alphabetical: true
        }],
        'vue/attribute-hyphenation': ['error', 'never', {
            ignore: []
        }],
        'vue/singleline-html-element-content-newline': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        '@stylistic/js/arrow-parens': ['error'],
        'boundaries/element-types': 'off',
        'boundaries/no-private': 'off',
        'constructor-super': 'off',
        indent: ['off'],
        'linebreak-style': 'off',
        '@stylistic/js/comma-dangle': ['off', {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        }],
        '@stylistic/js/linebreak-style': 'off',
        '@stylistic/js/max-len': ['error', {code: 140, "ignoreTemplateLiterals": true, "ignoreStrings": true}],
        '@stylistic/js/object-curly-newline': ['error', {
            ObjectExpression: {multiline: true, consistent: true},
            ObjectPattern: {multiline: true, consistent: true},
            ExportDeclaration: {multiline: true, minProperties: 3},
        }],
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
        'no-console': 'off',
        'no-debugger': 'error',
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: true,
            },
        ],
        'no-unused-expressions': 'error',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-bitwise': ['error', {allow: ['~']}],
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-redeclare': 'off',
        'no-shadow': ['off'],
        'no-restricted-globals': 'off',
        'object-curly-newline': 'off',
        'prefer-destructuring': ['error', {
            array: false,
            object: true,
        }, {
            enforceForRenamedProperties: false,
        },
        ],
        '@typescript-eslint/naming-convention': ['error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: ['enumMember'],
                format: ['camelCase', 'UPPER_CASE'],
            },
        ],
        'import/no-unresolved': [
            'error',
            {'ignore': ['__federation__', 'dev-wrapper/styles']}
        ],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-internal-modules': 'off',

    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.js'],
            rules: {
                indent: 'off',
                '@typescript-eslint/indent': [
                    'error',
                    2,
                ],
                '@typescript-eslint/member-delimiter-style': ['error', {
                    multiline: {
                        delimiter: 'comma',
                    },
                    singleline: {
                        delimiter: 'comma',
                        requireLast: false,
                    },
                }],
                '@typescript-eslint/lines-between-class-members': ['error', 'always', {
                    exceptAfterSingleLine: true,
                }],
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                '@typescript-eslint/naming-convention': ['off'],
            },
        },
    ],
};
