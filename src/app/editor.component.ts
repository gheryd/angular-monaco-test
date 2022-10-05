import { Component, Input, OnDestroy } from '@angular/core';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import * as _M from 'monaco-editor';
import { Position } from 'monaco-editor';
import { tokenProviders } from './cfg1.monaco';


@Component({
    selector: 'editor',
    template: `
        <div>{{title}}</div>
        <div style="height: 200px;">
            <ngx-monaco-editor 
                [options]="editorOptions" 
                [(ngModel)]="code"
                (onInit)="onInitEditor($event)"
                
            ></ngx-monaco-editor>
        </div>
        <pre style="background-color:aliceblue">{{code|json}}</pre>
    `
})
export class EditorComponent implements OnDestroy {


    @Input() suggestTerms!: string[];
    @Input() title!: string;

    private rules = ['regolaA', 'regolaB', 'regolaC', 'regolaD', 'regolaE']
    private formulas = ['formulaA', 'formulaB', 'formulaC', 'formulaaD', 'formulaE']

    private completationRegistration!: _M.IDisposable;
    private hoverRegistration!: _M.IDisposable;
    // private tokenProviderRegistration!: _M.IDisposable;


    // editorOptions  = {theme: 'vs-dark', language: 'javascript'};
    // code: string= 'function x() {\nconsole.log("Hello world!");\n}';
    editorOptions = { theme: 'ppnext-theme', language: 'ppnext', 'semanticHighlighting.enabled': true };
    code: string = '';


    onInitEditor(editor: _M.editor.IStandaloneCodeEditor) {
        console.log('---------->onInitEditor');

        let line = editor.getPosition();
        console.log('editor', editor);
        this.updateRules();

        this.completationRegistration = this.registerSuggests();
        this.hoverRegistration = this.registerHover();


    }


    ngOnDestroy(): void {
        this.completationRegistration.dispose();
        this.hoverRegistration.dispose();
        //this.regitesterSemanticToken();
    }


    private updateRules() {
        const monaco = (<any>window).monaco;
        tokenProviders.rules = this.rules;
        tokenProviders.rules = this.formulas;

        monaco.languages.setMonarchTokensProvider('ppnext', tokenProviders);
    }


    private registerSuggests(): _M.IDisposable {
        const monaco = (<any>window).monaco;

        const provideCompletionItems = (model: _M.editor.ITextModel, position: Position) => {
            var word = model.getWordUntilPosition(position);

            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };
            const suggestionsRules: _M.languages.CompletionItem[] = this.rules.map(
                term => {
                    return {
                        label: term + ' - regolona desc..',
                        insertText: term,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        range
                    }
                }
            );
            const suggestionsFormulas: _M.languages.CompletionItem[] = this.formulas.map(
                term => {
                    return {
                        label: term + ' - formula desc...',
                        insertText: term,
                        kind: monaco.languages.CompletionItemKind.Function,
                        range
                    }
                }
            );

            return { suggestions: [...suggestionsRules, ...suggestionsFormulas] }
        }
        return monaco.languages.registerCompletionItemProvider(
            'ppnext', { provideCompletionItems: provideCompletionItems }
        );
    }



    private registerHover(): _M.IDisposable {
        const monaco = (<any>window).monaco;

        return monaco.languages.registerHoverProvider(
            'ppnext',
            {
                provideHover: function (model: _M.editor.ITextModel, position: Position, token: _M.CancellationToken) {
                    console.log('token', token);

                    var word = model.getWordAtPosition(position);
                    model.getWordAtPosition(position)
                    // const range = {
                    //     startLineNumber: position.lineNumber,
                    //     endLineNumber: position.lineNumber,
                    //     startColumn: word.startColumn,
                    //     endColumn: word
                    // }

                    console.log('getWordUntilPosition:', word, 'getWordAtPosition', model.getWordAtPosition(position));


                    const range: _M.IRange = new monaco.Range(
                        1,
                        1,
                        model.getLineCount(),
                        model.getLineMaxColumn(model.getLineCount())
                    )
                    if (word) {
                        const contents: _M.IMarkdownString[] = [
                            { value: '### Informazioni su cosa stai sopra' },
                            { value: 'questa formula si chiama -> ' + word.word + '(par1, par2)' },
                            { value: '**par1**: stringa ' },
                            { value: '**par2**: stringa ' },


                        ]; 
                        const hover: _M.languages.Hover = {
                            range,
                            contents
                        }
                        return hover;
                    } else {
                        return undefined
                    }

                }
            }
        );
    }


    // private legend = {
    //     tokenTypes: [
    //         'rule', 'rule2', 'form1', 'form2'
    //     ],
    //     tokenModifiers: [
    //         'int'
    //     ]
    // }


    // private regitesterSemanticToken() {
    //     const monaco = (<any>window).monaco;
    //     const getType = (type: string) => {
    //         console.log('getType:', type);
    //         return this.legend.tokenTypes.indexOf(type)
    //     }
    //     const getModifier = (modifiers: any) => {
    //         if (typeof (modifiers) == 'string') {
    //             modifiers = [modifiers];
    //         }
    //         if (Array.isArray(modifiers)) {
    //             let nModifiers = 0;
    //             for (let modifier of modifiers) {
    //                 const nModifier = this.legend.tokenModifiers.indexOf(modifier);
    //                 if (nModifier > -1) {
    //                     nModifiers |= (1 << nModifier) >>> 0;
    //                 }
    //             }
    //             return nModifiers;
    //         } else {
    //             return 0;
    //         }
    //     }

    //     const provider: _M.languages.DocumentSemanticTokensProvider = {
    //         getLegend: () => this.legend,
    //         provideDocumentSemanticTokens: (model: _M.editor.ITextModel, lastResultId: string, token: _M.CancellationToken) => {
    //             const lines = model.getLinesContent();


    //             console.log('lines:', lines);


    //             /** @type {number[]} */
    //             const data = [];

    //             let prevLine = 0;
    //             let prevChar = 0;

    //             for (let i = 0; i < lines.length; i++) {
    //                 const line = lines[i];

    //                 for (let match = null; (match = tokenPattern.exec(line));) {
    //                     // translate token and modifiers to number representations
    //                     let type = getType(match[1]);
    //                     if (type === -1) {
    //                         continue;
    //                     }
    //                     //let modifier = match[2].length ? getModifier(match[2].split('.').slice(1)) : 0;
    //                     let modifier = 0;
    //                     data.push(
    //                         // translate line to deltaLine
    //                         i - prevLine,
    //                         // for the same line, translate start to deltaStart
    //                         prevLine === i ? match.index - prevChar : match.index,
    //                         match[0].length,
    //                         type,
    //                         modifier
    //                     );

    //                     prevLine = i;
    //                     prevChar = match.index;
    //                 }
    //             }
    //             console.log('data ------->', data)
    //             return {
    //                 data: new Uint32Array(data),
    //                 resultId: undefined
    //             };
    //         },
    //         releaseDocumentSemanticTokens: function (resultId) {}
    //     }

    //     const tokenPattern = new RegExp('([a-zA-Z]+)((?:\\.[a-zA-Z]+)*)', 'g');
    //     this.tokenProviderRegistration = monaco.languages.registerDocumentSemanticTokensProvider('ppnext', provider)
    // }



}
