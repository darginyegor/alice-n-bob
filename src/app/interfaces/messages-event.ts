import { Message } from './message';

export interface MessagesEvent {
    type: 'new' | 'delete' | 'deleteFor';
    message?: Message;
    messageId?: number;
    clientId?: number;
}
