/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Client, Message, ClientOptions, Collection } from "discord.js";
import { ListenerAdapter, UniConfigFunction } from "../typings/configurations";
import { ShardingManager, SharderOptions } from "kurasuta";
import { configInitialize, configManagement, defaultConfig } from "@unicord/core";
import { isMaster } from "cluster";
import chalk from "chalk";
import { version } from "../../package.json";

export const defaultParameter: ClientOptions = {
    disableEveryone: true
}

export class UniClient extends Client {
    constructor(opt?: ClientOptions) {
        super(opt)
    }
}

export class UniShardController extends ShardingManager {
    constructor(file: string, opt: SharderOptions) {
        super(file, opt)
    }

    public runMaster(callback: Function) {
        if (isMaster) {
            callback(this)
        }
    }
}

export class UniBuilder {
    private token: string | undefined
    private parameter?: ClientOptions
    private clusterparm?: SharderOptions

    public version: string = version
    public listenedEvents = new Collection<string, ListenerAdapter>()
    public client?: UniClient
    public storage?: UniConfigFunction = configInitialize()
    public shardpath?: string

    protected sharder: boolean = false

    constructor() { }
    public setToken(token: string): void {
        this.token = token
    }
    public setParameter(parm: ClientOptions): void {
        if (this.isSharding()) console.info(chalk.bgYellowBright("WARN") + ": UniBuilder is configured for sharding. This parameter will be ignored.")
        this.parameter = <ClientOptions>Object.assign(defaultParameter, parm)
    }
    public addEventListener(event: ListenerAdapter): void {
        this.listenedEvents.set(event.name, event)
    }
    public setClusterClient(file: string): void {
        if (!this.isSharding()) console.info(chalk.bgYellowBright("WARN") + ": UniBuilder isn't configured for sharding. This parameter will be ignored.")
        this.shardpath = file
    }
    public setClusterParameter(opt: SharderOptions): void {
        if (!this.isSharding()) console.info(chalk.bgYellowBright("WARN") + ": UniBuilder isn't configured for sharding. This parameter will be ignored.")
        this.clusterparm = opt
    }

    public build(): UniClient | UniShardController | undefined {
        if (this.isSharding()) {
            const manager = new UniShardController(<string>this.shardpath, <SharderOptions>this.clusterparm)
            manager.spawn();
            return manager
        } else {
            return this.initialize()
        }
    }

    private initialize(): UniClient {
        this.client = new UniClient(this.parameter)
        this.client!.login(this.token)
        return <UniClient>this.client
    }
    private isSharding(): boolean {
        return this.sharder
    }

    public useSharding(): void {
        this.sharder = true
    }
}
