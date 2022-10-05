import { Component, Input } from '@angular/core';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import * as _M from 'monaco-editor';
import { Position } from 'monaco-editor';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    editor: 'primo'|'uno' = 'primo'
}
