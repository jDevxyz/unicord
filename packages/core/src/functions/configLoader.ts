/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { UniConfig, UniConfigFunction } from "../typings/configurations";
import { require as __require } from "app-root-path";
import { defaultConfig } from "./defaultConfig";

export function configLoader(): UniConfig {
    let file: Object
    try {
        file = __require("/unicord.json");
    } catch(__err) {
        file = {
            error: true,
            message: __err.stack
        }
    }

    return <UniConfig>file;
}

export function configManagement(): UniConfigFunction {
    const storage = new Map<string, string>();
    return {
        setToken(token: string): void {
            storage.set("token", token);
        },
        /**
         * Both key and value will be converted into LowerCases.
         * @method setConfig
         * @param {string} key
         * @param {string} value
         */
        setConfig(key: string, value: string): void {
            storage.set(key.toLowerCase(), value.toLowerCase())
        },
        get(key: string): Map<string, string> | string | undefined | null {
            if (!key) return storage;
            return storage.get(key);
        }
    }
}

export function configInitialize(): UniConfigFunction {
    const file = configLoader();
    const storage = configManagement();
    if(!file.error) { forEachify(file, storage); } else { forEachify(defaultConfig, storage); }
    return storage;
}

export function forEachify(file: UniConfig, storage: UniConfigFunction) {
    Object.keys(file).forEach(keys => {
        Object.values(file).forEach(values => {
            storage.setConfig(keys, values);
        });
    });
}