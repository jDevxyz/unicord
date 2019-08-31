/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Client, Message } from "discord.js";
import { ListenerAdapter } from "../typings/configurations";

class UniDiscordApi {
    private UniClient: any
    private client: Client
    private token: string
    public listenedEvents: Map<string, any>

    constructor() {


        this.UniClient = class UniClient extends Client {
            constructor() { 
                super()
            }
        }
        this.listenedEvents = new Map() // sekalian belajar pake decorator wkwkwkkw
        this.client = new Client()


    }

    public setToken(token: string): void {
        this.token = token
    }
    public build(): Client {
        this.client.login(this.token)
        return this.client
    }
    public addEventListener(event: ListenerAdapter): void {
        this.listenedEvents.set(event.name, event) // ini beneran add?
    }
}

