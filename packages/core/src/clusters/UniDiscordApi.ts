/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Client, Message, ClientOptions } from "discord.js";
import { ListenerAdapter, UniConfigFunction } from "../typings/configurations";
import { paramInjector } from "@unicord/decorator"
import { configInitialize, configManagement, defaultConfig } from "@unicord/core"

const defaultParameter: ClientOptions = {
    disableEveryone: true
}

class UniBuilder {
    private UniClient: any
    private token: string | undefined
    private parameter?: ClientOptions

    public listenedEvents: Map<string, any>
    public client?: Client
    public storage?: UniConfigFunction

    constructor() {
        

        class UniClient extends Client {
            constructor(opt?: ClientOptions) {
                super(opt)
            }
        }

        this.UniClient = UniClient;
        this.listenedEvents = new Map()

        this.storage = configInitialize();

        
    } 
    public setToken(token: string): void {
        this.token = token
    }
    public setParameter(parm: ClientOptions) {
        this.parameter = <ClientOptions>Object.assign(parm, defaultParameter)
    }
    public build(): Client {
        this.client = new this.UniClient(this.parameter)
        this.client!.login(this.token)
        return <Client>this.client
    }
    public addEventListener(event: ListenerAdapter): void {
        this.listenedEvents.set(event.name, event)
    }
}

