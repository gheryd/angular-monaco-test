import * as _M  from 'monaco-editor';


export const theme: _M.editor.IStandaloneThemeData = {

  base: 'vs',

  inherit: true,

  rules: [
      { token: 'rule', foreground: '#FF00FF' },
      { token: 'formula', foreground: '#00AAAA' },

      { token: 'keyword', foreground: '#C70039' },

      { token: 'comment', foreground: '#008000' },

      { token: 'string', foreground: '#FFFF00' },

      { token: 'string.escape', foreground: '#d15f0e', fontStyle: 'bold', background: '#000000' },

      { token: 'string.invalid', foreground: '#FF0000' },

      { token: 'string.escape.invalid', foreground: '#FF0000' },

      { token: 'variable', foreground: '#5D3FD3', fontStyle: 'bold' },

      { token: 'operator', foreground: '#C70039' },

      { token: 'number', foreground: '#00AAAA' },

      { token: 'number.float', foreground: '#00AAAA' },

      { token: 'brackets', foreground: '#C70039', fontStyle: 'bold' },

      { token: 'boolean', foreground: '#0000AA', fontStyle: 'bold' },

      {token: 'booleanoperator', foreground: '#5500AA', fontStyle: 'bold'},

      { token: 'formulares', foreground: '#00AAAA', fontStyle: 'bold' },

      { token: 'formulaerr', foreground: '#FFAAAA', fontStyle: 'bold' },

  ],

  colors: {

      editorBackground: '#FFFFFE',

      editorForeground: '#000000',

      editorInactiveSelection: '#E5EBF1',

      editorIndentGuides: '#D3D3D3',

      editorActiveIndentGuides: '#939393',

      editorSelectionHighlight: '#ADD6FF4D'

  }

}