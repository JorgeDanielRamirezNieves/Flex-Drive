import { Module } from '@nestjs/common';
import { ContractController } from './controllers/contract.controller';
import { ContractService } from './service/contract.service';
import { TypeContractController } from './controllers/type-contract.controller';
import { TypeContractService } from './service/type-contract.service';
import { TypeContractLegalController } from './controllers/type-contract-legal.controller';
import { TypeContractLegalService } from './service/type-contract-legal.service';

@Module({
  controllers: [ContractController, TypeContractController, TypeContractLegalController],
  providers: [ContractService, TypeContractService, TypeContractLegalService]
})
export class ContractModule {}
