/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { ListenerAdapter } from "../typings/configurations";
import { UniClient } from "..";

export class EventListener implements ListenerAdapter {
    constructor(public client: UniClient, public name: string) {
        
    }
}
