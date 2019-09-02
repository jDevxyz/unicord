/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

import { Collection, Message } from "discord.js";
import { ListenerAdapter, DeserializedEvent } from "../typings/configurations";
import { UniClient } from "..";

export class EventDeserializer {
    public deserializedArray = new DeserializedArray()

    constructor(private listenedEvents: Collection<string, ListenerAdapter>) {
        this.deserializedArray.generateArray("messageEvents")
    }

    public deserialize(): void {
        // this.listenedEvents.array().forEach((e: ListenerAdapter) => {
        //     this.deserializedArray.take("messageEvents")!.push(e.MessageReceivedEvent!)
        // });
    }
    public listen(client: UniClient): UniClient {
        client.on("message", (message: Message) => {
            this.listenedEvents.array().forEach((e: ListenerAdapter) => {
                e.GuildMessageReceivedEvent!
            })
        })

        return client
    }

}

export class DeserializedArray extends Collection<string, Function[]> {
    generateArray(name: string): DeserializedArray {
        return this.put(name, new Array<Function>());
    }

    put(name: string, data: Function[]): DeserializedArray {
        return super.set(name, data)
    }
    take(name: string): Function[] | undefined {
        return super.get(name)
    }
}
