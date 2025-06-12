import { ServiceRepository } from '../ports/ServiceRepository';
import { ServiceEntity, ServiceDetailsEntity } from '../entities/Service';

export class GetServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<ServiceEntity[]> {
    return await this.serviceRepository.getAllServices();
  }
}

export class GetServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<ServiceEntity | null> {
    if (!id.trim()) {
      throw new Error('Service ID is required');
    }
    return await this.serviceRepository.getServiceById(id);
  }
}

export class GetServiceDetailsUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<ServiceDetailsEntity | null> {
    if (!id.trim()) {
      throw new Error('Service ID is required');
    }
    return await this.serviceRepository.getServiceDetails(id);
  }
}