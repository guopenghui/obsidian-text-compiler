import { App, Notice, FuzzySuggestModal, FuzzyMatch, Modal, Setting } from "obsidian";
import PluginType from "./main";

interface Compiler {
    name: string;
    description: string;
    example?: string;
    engine: (text: string) => string;
}

class CompilerSuggestModal extends FuzzySuggestModal<Compiler> {
    plugin: PluginType;

    constructor(plugin: PluginType) {
        super(plugin.app);
        this.plugin = plugin;
    }

    getItems(): Compiler[] {
        return this.plugin.settings.compilers;
    }

    getItemText(item: Compiler): string {
        return item.name;
    }

    onChooseItem(item: Compiler, evt: MouseEvent | KeyboardEvent): void {
        let modal = new CompilerModal(this.plugin, item);
        modal.open();
    }
}

class CompilerModal extends Modal {
    compiler: Compiler;
    constructor(plugin: PluginType, compiler: Compiler) {
        super(plugin.app);
        this.compiler = compiler;
    }
    onOpen(): void {
        this.contentEl.empty();
        this.contentEl.createEl("h2", { text: this.compiler.name, attr: { style: "margin: 0;" } });
        this.contentEl.createEl("p", { text: this.compiler.description, attr: { style: "margin: 0;" } });
        this.contentEl.createEl("hr", { attr: { style: "margin: 3px 0;" } });

        const textEl = this.contentEl.createDiv({ attr: { style: "display: flex;" } });
        const left = textEl.createDiv({ attr: { style: "flex: 1;" } });
        const right = textEl.createDiv({ attr: { style: "flex: 1; width: 100%; padding: 4px 8px; margin-left: 5px;border: 1px solid gray; border-radius: 5px;" } });
        const inputEl = left.createEl("textarea", { attr: { rows: "10", style: "width: 100%;" } });
        const showEl = right.createEl("code", { attr: { style: "user-select: text; line-height: 1.2; font-family: 'JetBrains Mono', 'Fira Code', Menlo, SFMono-Regular,Consolas, 'Roboto Mono', monospace; white-space: pre;" } });

        if (this.compiler.example) {
            inputEl.value = this.compiler.example;
            showEl.innerText = this.compiler.engine(this.compiler.example);
        }

        const modalSelf = this;
        inputEl.addEventListener("keyup", function (e) {
            if (e.key === "Tab") {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);

                this.selectionStart = this.selectionEnd = start + 4;
            }
            try {
                showEl.innerText = modalSelf.compiler.engine(inputEl.value);
            } catch (e) {
                showEl.innerText = "Compiler Error";
            }
        });

        this.contentEl.createEl("button", { text: "Copy" }, (btn) => {
            btn.addEventListener("click", async (e) => {
                await navigator.clipboard.writeText(this.compiler.engine(inputEl.value));
                new Notice("copied to clipboard");
                this.close();
            });
        });
    }
    onClose(): void {

    }
}

class CompilerConfitModal extends Modal {
    plugin: PluginType;
    save: boolean = false;
    compiler: Compiler = null;

    constructor(plugin: PluginType, compiler?: Compiler) {
        super(plugin.app);
        this.plugin = plugin;
        if (compiler) {
            this.compiler = Object.assign({}, compiler);
        } else {
            this.compiler = {
                name: "",
                description: "",
                engine: null,
            };
        }
    }

    onOpen(): void {
        new Setting(this.contentEl)
            .setName("Name")
            .setDesc("Used to search")
            .addText(text => text
                .setValue(this.compiler.name)
                .onChange(value => {
                    this.compiler.name = value;
                })
            );
        new Setting(this.contentEl)
            .setName("Description")
            .setDesc("Describe function of this compiler")
            .addText(text => text
                .setValue(this.compiler.description)
                .onChange(value => {
                    this.compiler.description = value;
                })
            );
        new Setting(this.contentEl)
            .setName("Engine")
            .setDesc("Input a transform function: (text: string) => string")
            .addTextArea(textArea => textArea
                .setValue(this.compiler.engine?.toString().match(/\/\*b\*\/\((.*)\)\/\*e\*\//s)?.[1] ?? "")
                .onChange(func => {
                    try {
                        this.compiler.engine =
                            new Function("text", `return /*b*/(${func})/*e*/(text)`) as (text: string) => string;
                    } catch (e) {

                    }
                })
            );

        new Setting(this.contentEl)
            .addButton(button => button
                .setIcon("check")
                .onClick(() => {
                    this.save = true;
                    this.close();
                })
            )
            .addButton(button => button
                .setIcon("x")
                .onClick(() => {
                    this.close();
                })
            );
    };
    onClose() {
        if (!this.save) return;

        let index = this.plugin.settings.compilers.findIndex(v => v.name === this.compiler.name);
        if (index !== -1) {
            this.plugin.settings.compilers[index] = this.compiler;
        } else {
            this.plugin.settings.compilers.push(this.compiler);
        }
    };

}

// confirm before some dangerous operation
class WarningModal extends Modal {
    onSubmit: () => Promise<void>;
    message: string;

    constructor(app: App, message: string, onSubmit: () => Promise<void>) {
        super(app);
        this.message = message;
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h2", { text: this.message });

        new Setting(contentEl)
            .addButton((btn) => btn
                .setButtonText("Yes")
                .setWarning()
                .setCta()
                .onClick(() => {
                    this.close();
                    this.onSubmit();
                })
            )
            .addButton((btn) => btn
                .setButtonText("No!!!")
                .setCta() // what is this?
                .onClick(() => {
                    this.close();
                }));
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}


export { CompilerSuggestModal, CompilerModal, CompilerConfitModal, WarningModal };
export type { Compiler };