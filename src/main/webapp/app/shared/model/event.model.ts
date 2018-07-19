import { Moment } from 'moment';

export interface IEvent {
  id?: number;
  name?: string;
  data?: string;
  published_at?: Moment;
}

export const defaultValue: Readonly<IEvent> = {};
