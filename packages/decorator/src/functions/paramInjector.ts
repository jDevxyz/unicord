import { ClientOptions } from "discord.js";

export function paramInjector(param: ClientOptions) {
    return function(constructor: Function) {
        constructor.prototype.param = param
    }
}
