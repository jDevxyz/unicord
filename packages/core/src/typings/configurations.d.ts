/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Client, Collection } from "discord.js";
import { EventEmitter } from "events";
import { UniClient } from "../clusters/UniDiscordApi";

export interface UniConfig {
    error?: boolean
    version?: number
    sourceFolder?: string
    componentFolder?: string
    providers?: UniDatabase
    prefix: string
}

export interface UniProvider {
    databases?: UniDatabase

}

export interface UniDatabase {
    enabled?: boolean
    databaseProvider?: TypeDatabase
    databaseConnection?: UniDatabaseConnection
    customDatabaseAPI?: string
}

export interface UniDatabaseConnection {
    address?: string
    user?: string
    password?: string
    dbname?: string
    port?: number
}

export enum TypeDatabase {
    Enmap = "Enmap",
    QuickDB = "Quick.db",
    mySQL = "mySQL",
    postgreSQL = "postgreSQL",
    mongoDB = "mongoDB",
    JSON = "JSON",
    Custom = "Custom"
}

export interface UniConfigFunction {
    setToken(token: string): void
    setConfig(key: string, value: string): void
    get(key: string): Collection<string, string> | string | undefined | null
}

export interface ListenerAdapter  {
    name: string

    // MESSAGE EVENTS
    GuildMessageReceivedEvent?(event: EventReceiver): void
    MessageReceivedEvent?(event: EventReceiver): void
    PrivateMessageReceivedEvent?(event: EventReceiver): void

    /**
     * @experimental
     */
    WebsocketEvent?(event: EventReceiver): void

    // STATE EVENTS
    ReadyEvent?(event: EventReceiver): void
    DebugEvent?(event: EventReceiver): void
    WarnEvent?(event: EventReceiver): void
    ExceptionEvent?(event: EventReceiver): void
    DisconnectEvent?(event: EventReceiver): void
    ReconnectEvent?(event: EventReceiver): void
    ShutdownEvent?(event: EventReceiver): void

    // SHARD EVENTS
    ShardDebugEvent?(event: EventReceiver): void
    ShardMessageEvent?(event: EventReceiver): void
    ShardReadyEvent?(event: EventReceiver): void
    ShardReconnectEvent?(event: EventReceiver): void
    ShardResumeEvent?(event: EventReceiver): void
    ShardDisconnectEvent?(event: EventReceiver): void
}

export enum TypeEvents {
    "GuildMessageReceivedEvent", "MessageReceivedEvent", "PrivateMessageReceivedEvent",
    "WebsocketEvent",
    "ReadyEvent", "DebugEvent", "WarnEvent", "ExceptionEvent", "DisconnectEvent", "ReconnectEvent", "ShutdownEvent",
    "ShardReadyEvent", "ShardReconnectEvent", "ShardResumeEvent", "ShardDisconnectEvent"
}

export interface EventReceiver {
    name: string
    type: TypeEvents
    getClient(): UniClient
    getEvents(): EventEmitter
}

export interface DeserializedEvent {
    
}
