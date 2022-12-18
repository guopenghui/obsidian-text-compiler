import { Plugin } from 'obsidian';
import { PluginSettings, TextCompilerSetting, DEFAULT_SETTINGS } from "./settings";

import { CompilerSuggestModal } from "./modal";

export default class MyPlugin extends Plugin {
    settings: PluginSettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new TextCompilerSetting(this));

        this.addCommand({
            id: "get-compiler",
            name: "Get a Compiler",
            callback: () => {
                let modal = new CompilerSuggestModal(this);
                modal.open();
            }
        });

    }

    onunload() {
    }

    async loadSettings() {
        let data = await this.loadData();
        let parsedData: PluginSettings = { compilers: [] };
        if (!data?.compilers) {
            data = { compilers: [] };
        }

        parsedData.compilers = data.compilers.map((c: any) => {
            return {
                name: c.name,
                description: c.description,
                engine: new Function("text", `return /*b*/(${c.engine})/*e*/(text)`)
            };
        });
        parsedData = Object.assign({}, DEFAULT_SETTINGS, parsedData);

        DEFAULT_SETTINGS.compilers.forEach((builtin) => {
            if (!parsedData.compilers.some((c) => c.name === builtin.name)) {
                parsedData.compilers.push(builtin);
            }
        });

        this.settings = parsedData;
    }

    async saveSettings() {

        let setting = JSON.stringify(this.settings, (key, value) => {
            if (key === "engine") return value.toString().match(/\/\*b\*\/\((.*)\)\/\*e\*\//s)[1];
            return value;
        });
        let data = JSON.parse(setting);

        // remove builtin compilers
        data.compilers = (data.compilers as { name: string; }[])
            .filter((c) => !DEFAULT_SETTINGS.compilers.some(builtin => c.name === builtin.name));
        await this.saveData(data);
    }
}
