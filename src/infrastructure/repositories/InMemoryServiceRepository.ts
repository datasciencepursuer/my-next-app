import { ServiceRepository } from '@/core/ports/ServiceRepository';
import { ServiceEntity, ServiceDetailsEntity } from '@/core/entities/Service';
import { servicesData, serviceDetailsData } from '../config/services';

export class InMemoryServiceRepository implements ServiceRepository {
  async getAllServices(): Promise<ServiceEntity[]> {
    return servicesData.map(service => ServiceEntity.fromData(service));
  }

  async getServiceById(id: string): Promise<ServiceEntity | null> {
    const service = servicesData.find(s => s.id === id);
    return service ? ServiceEntity.fromData(service) : null;
  }

  async getServiceDetails(id: string): Promise<ServiceDetailsEntity | null> {
    const details = serviceDetailsData[id] || serviceDetailsData['cloud-solutions'];
    return details ? ServiceDetailsEntity.fromData(details) : null;
  }
}