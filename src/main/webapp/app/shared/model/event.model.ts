import { Moment } from 'moment';
import { IDevice } from 'app/shared/model//device.model';

export interface IEvent {
  id?: number;
  name?: string;
  data?: string;
  published_at?: Moment;
  device?: IDevice;
}

export const defaultValue: Readonly<IEvent> = {};
