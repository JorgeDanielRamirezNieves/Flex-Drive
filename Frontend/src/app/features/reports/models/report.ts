import { User } from '../../user/models/user';
import { TypeReport } from './type-report';

export interface Report {
  uuid: string;
  description: string;
  status: 'pending' | 'in_progress' | 'on_hold' | 'resolve';
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date;
  idUser: string;
  idAdmin: string;
  priority: '0' | '1' | '2' | '3';
  idTypeReport: string;
  typeReport: {
    name: string;
  };
}
