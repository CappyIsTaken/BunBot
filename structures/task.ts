import { ScheduledTask } from "node-cron";
import { MyClient } from "..";

type ExecuteFunction = (client: MyClient) => Promise<void>;

export type Task = {
    name: string,
    execute: ExecuteFunction,
    cron: string,
    timezone: string,
    cronJob?: ScheduledTask | undefined
}