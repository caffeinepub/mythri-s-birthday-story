import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Wish {
    name: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    addWish(name: string, message: string): Promise<void>;
    getAllWishes(): Promise<Array<Wish>>;
    getAllWishesByName(): Promise<Array<Wish>>;
    getWish(id: string): Promise<Wish>;
}
