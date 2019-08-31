/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

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
    "Enmap", "Quick.db", "mySQL", "postgreSQL", "mongoDB", "JSON", "Custom"
}

export interface UniConfigFunction {
    setToken(token: string): void
    setConfig(key: string, value: string): void
    get(key: string): Map<string, string> | string | undefined | null
}

export interface ListenerAdapter  {
    name?: string | undefined
}