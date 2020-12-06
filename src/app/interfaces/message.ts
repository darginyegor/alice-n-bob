export interface Message {
    id: number;
    senderId: number;
    body: string;
    createdAt: Date;
    deletedFor: number[];
}
