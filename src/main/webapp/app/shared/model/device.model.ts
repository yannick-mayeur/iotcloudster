import { IEvent } from 'app/shared/model//event.model';

export interface IDevice {
  id?: number;
  core_id?: string;
  events?: IEvent[];
}

export const defaultValue: Readonly<IDevice> = {};
