const vscode = require("vscode");
const { formatter } = require("@digibear/mush-format");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.format",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log("No editor!");
        return;
      }
      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);
      const formatted = await formatter.format(text);
      vscode.env.clipboard.writeText(formatted.data);
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
