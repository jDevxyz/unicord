/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { UniConfig } from "../typings/configurations";
import { require as __require } from "app-root-path";

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

    return <UniConfig>file
}