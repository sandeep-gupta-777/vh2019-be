import { Test, TestingModule } from '@nestjs/testing';
import { DbCrudService } from './db-crud.service';

describe('DbCrudService', () => {
  let service: DbCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbCrudService],
    }).compile();

    service = module.get<DbCrudService>(DbCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
