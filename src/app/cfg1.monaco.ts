import * as _M  from 'monaco-editor';


const keywords = ['IF', 'ELSE', 'ENDIF', 'WHILE', 'ENDWHILE', 'FOR', 'TO', 'NEXT', 'OR', 'AND', 'NOT'];
const operators = [
    '=', '>', '<',  '<=', '>=', '+', '-', '*', '/',

]
const rules: string[] = [];
const formulas: string[] = []

const escapes = /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/;

const symbols = /[=><!~?:&|+\-*\/\^%]+/;


const root:  _M.languages.IMonarchLanguageRule[] = 
[
    [/true|false/, 'boolean'],
        
    {
        regex: /@?[a-zA-Z][\w$]*/,
        action: {
            cases: {
                '@rules': 'rule',
                '@formulas': 'formula',
                '@keywords': 'keyword',
                
                '@default': 'variable'
            }
        }
    },
    { include: '@whitespace' },
    {
        regex: /[;].*/,
        action: {
            token: 'comment'
        }
    },
    
    {
        regex: /_RES/,
        action: {
            token: 'formulares'
        },
    },
    {
        regex: /_ERR/,
        action: {
            token: 'formulaerr'
        }
    },
    {
        regex: /@symbols/,
        action: {
            cases: {
                '@operators': 'operator',
                '@default': ''
            }
        }
    },


    // numbers
    [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
    [/\d+/, 'number'],

    // strings
    [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
    [/'/, { token: 'string.quote', bracket: '@open', next: '@string' }],

    // characters
    [/'[^\\']'/, 'string'],
    [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
    [/'/, 'string.invalid']
]

type Tokenizer = {
    [name: string]: _M.languages.IMonarchLanguageRule[];
};

const tokenizer: Tokenizer = {
    root,
    string: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    whitespace: [
        [/[ \t\r\n]+/, 'white']
    ]
}


export const tokenProviders: _M.languages.IMonarchLanguage = {
    keywords,
    rules,
    formulas,
    operators,
    escapes,
    symbols,
    tokenizer,
    ignoreCase: false
}
