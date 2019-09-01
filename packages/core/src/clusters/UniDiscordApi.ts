/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Client, Message, ClientOptions, Collection } from "discord.js";
import { ListenerAdapter, UniConfigFunction } from "../typings/configurations";
import { configInitialize, configManagement, defaultConfig } from "@unicord/core";

const defaultParameter: ClientOptions = {
    disableEveryone: true
}

class UniClient extends Client {
    constructor(opt?: ClientOptions) {
        super(opt)
    }
}

class UniBuilder {
    private token: string | undefined
    private parameter?: ClientOptions

    public listenedEvents: Collection<string, any>
    public client?: UniClient
    public storage?: UniConfigFunction

    constructor() {


        this.listenedEvents = new Collection()

        this.storage = configInitialize();

        
    }
    public setToken(token: string): void {
        this.token = token
    }
    public setParameter(parm: ClientOptions): void {
        this.parameter = <ClientOptions>Object.assign(defaultParameter, parm)
    }
    public build(): Client {
        this.client = new UniClient(this.parameter)
        this.client!.login(this.token)
        this.initialize()
        return <Client>this.client
    }
    public addEventListener(event: ListenerAdapter): void {
        this.listenedEvents.set(event.name, event)
    }

    private initialize(): void {
        
    }
}

export { UniBuilder, UniClient }
