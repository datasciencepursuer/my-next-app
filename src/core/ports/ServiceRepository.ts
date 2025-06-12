import { ServiceEntity, ServiceDetailsEntity } from '../entities/Service';

export interface ServiceRepository {
  getAllServices(): Promise<ServiceEntity[]>;
  getServiceById(id: string): Promise<ServiceEntity | null>;
  getServiceDetails(id: string): Promise<ServiceDetailsEntity | null>;
}