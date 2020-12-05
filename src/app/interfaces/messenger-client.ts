import { Subscription } from 'rxjs';

export interface MessengerClient {
    id: number;
    name: string;
    subscription: Subscription;
}
