import { Service, ServiceDetails } from '@/shared/types';

export class ServiceEntity implements Service {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly image: string,
    public readonly path: string,
    public readonly adjustments?: string
  ) {}

  static fromData(data: Service): ServiceEntity {
    return new ServiceEntity(
      data.id,
      data.title,
      data.description,
      data.image,
      data.path,
      data.adjustments
    );
  }

  toJSON(): Service {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      path: this.path,
      adjustments: this.adjustments,
    };
  }
}

export class ServiceDetailsEntity implements ServiceDetails {
  constructor(
    public readonly title: string,
    public readonly technologies: string[],
    public readonly products: string[],
    public readonly process: Array<{ step: string; description: string }>
  ) {}

  static fromData(data: ServiceDetails): ServiceDetailsEntity {
    return new ServiceDetailsEntity(
      data.title,
      data.technologies,
      data.products,
      data.process
    );
  }

  toJSON(): ServiceDetails {
    return {
      title: this.title,
      technologies: this.technologies,
      products: this.products,
      process: this.process,
    };
  }
}