/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

export interface UniConfig {
    error?: boolean
    sourceFolder?: string
    componentFolder?: string
}

export interface UniConfigFunction {
    setToken(token: string): void
    setConfig(key: string, value: string): void
    get(key: string): Map<string, string> | string | undefined | null
}