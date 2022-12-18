import { PluginSettingTab, Setting, Notice } from "obsidian";
import PluginType from "./main";
import { CompilerConfitModal, WarningModal } from "./modal";
import type { Compiler } from "./modal";

import { LIST_TO_TREE_NAME, LIST_TO_TREE_DESC, LIST_TO_TREE_EXAMPLE, transform } from "./compilers/list_to_tree";

interface PluginSettings {
    compilers: Compiler[];
}

function wrapFunc(f: (text: string) => string): (text: string) => string {
    let wraped = new Function("text", `return /*b*/(${f})/*e*/(text)`) as (text: string) => string;
    return wraped;
}

const DEFAULT_SETTINGS: PluginSettings = {
    compilers: [
        {
            name: LIST_TO_TREE_NAME,
            description: LIST_TO_TREE_DESC,
            example: LIST_TO_TREE_EXAMPLE,
            engine: wrapFunc(transform)
        }
    ]
};

class TextCompilerSetting extends PluginSettingTab {
    plugin: PluginType;
    constructor(plugin: PluginType) {
        super(plugin.app, plugin);
        this.plugin = plugin;
    }

    display() {
        this.containerEl.empty();
        this.containerEl.createEl("h1", { text: "Text Compiler Setting" });

        new Setting(this.containerEl)
            .setName("Add Compiler")
            .addButton(button => button
                .setIcon("plus-square")
                .setTooltip("add a new compiler")
                .onClick((e) => {
                    let modal = new CompilerConfitModal(this.plugin);
                    const onClose = modal.onClose.bind(modal);
                    modal.onClose = async () => {
                        onClose();
                        await this.plugin.saveSettings();
                        this.display();
                    };
                    modal.open();
                })
            );

        this.containerEl.createEl("h4", { text: "Compilers:" });
        this.plugin.settings.compilers.forEach(compiler => {

            new Setting(this.containerEl)
                .setName(compiler.name)
                .setDesc(compiler.description)
                .addButton(button => button
                    .setIcon("edit")
                    .onClick(e => {
                        let modal = new CompilerConfitModal(this.plugin, compiler);
                        const onClose = modal.onClose.bind(modal);
                        modal.onClose = async () => {
                            onClose();
                            await this.plugin.saveSettings();
                            this.display();
                        };
                        modal.open();
                    })
                )
                .addButton(button => button
                    .setIcon("x")
                    .setTooltip("Delete")
                    .setWarning()
                    .onClick(e => {
                        let modal = new WarningModal(this.plugin.app, "Do you really want to delete this compiler?", async () => {
                            this.plugin.settings.compilers
                                = this.plugin.settings.compilers.filter(c => c.name !== compiler.name);
                            await this.plugin.saveSettings();
                            new Notice("Compiler is deleted");
                            this.display();
                        });
                        modal.open();
                    })
                );
        });
    }
}



export { DEFAULT_SETTINGS, TextCompilerSetting };
export type { PluginSettings };