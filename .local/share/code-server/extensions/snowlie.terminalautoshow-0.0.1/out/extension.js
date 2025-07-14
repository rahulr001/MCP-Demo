'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
let Settings = {
    enable: true,
    forceClose: true,
    nonFileNameViews: ['input']
};
function activate(context) {
    let autoShow = new TerminalAutoShow();
    let autoShowControl = new TerminalAutoShowController(autoShow);
    //commands.registerCommand('terminalautoshow.Toggle', toggle);
    context.subscriptions.push(autoShow);
    context.subscriptions.push(autoShowControl);
}
exports.activate = activate;
function enableForceClose() {
    Settings.forceClose = true;
}
function disableForceClose() {
}
class TerminalAutoShow {
    constructor() {
        this._hidden = false;
        this._terminal = vscode_1.window.createTerminal();
        this.showTerminal();
    }
    isEditorsEmpty() {
        const editors = vscode_1.window.visibleTextEditors;
        for (let i = 0; i < editors.length; i++) {
            console.log(editors[i]);
            if (!this.isNonFileNameView(editors[i])) {
                return false;
            }
        }
        return true;
    }
    isNonFileNameView(item) {
        console.log(item);
        for (const view in Settings.nonFileNameViews) {
            if (item.document.fileName == Settings.nonFileNameViews[view]) {
                return true;
            }
        }
        return false;
    }
    doucmentClosed() {
        if (this.isEditorsEmpty()) {
            this.showTerminal();
        }
    }
    documentOpened() {
        this.hideTerminal();
    }
    showTerminal() {
        this._terminal.show();
        this._hidden = false;
    }
    hideTerminal() {
        this._terminal.show(); //Have to show it to focus it and then close it
        this._terminal.hide();
        this._hidden = true;
    }
    fullScreenTerminal() {
        this._terminal.show();
    }
    dispose() {
        this._terminal.dispose();
    }
}
class TerminalAutoShowController {
    constructor(autoShow) {
        this._autoShow = autoShow;
        let subscriptions = [];
        vscode_1.workspace.onDidCloseTextDocument(this._documentClosed, this, subscriptions);
        vscode_1.workspace.onDidOpenTextDocument(this._documentOpened, this, subscriptions);
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    _documentClosed() {
        this._autoShow.doucmentClosed();
    }
    _documentOpened() {
        this._autoShow.documentOpened();
    }
    dispose() {
        this._disposable.dispose();
    }
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map