import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';
import { theme } from './cfg.theme';
import { tokenProviders } from './cfg1.monaco';
import {EditorComponent} from './editor.component';

export function onMonacoLoad() {

    const monaco = (<any>window).monaco;
    monaco.languages.register({ id: 'ppnext' })
    
    monaco.languages.setMonarchTokensProvider('ppnext', tokenProviders);
    monaco.editor.defineTheme('ppnext-theme', theme);
   

    console.log('language ppnext: ', monaco.languages.getLanguages());
}


const monacoConfig: NgxMonacoEditorConfig = {
    baseUrl: 'assets',
    defaultOptions: { scrollBeyondLastLine: false },
    onMonacoLoad
};

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MonacoEditorModule.forRoot(monacoConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
