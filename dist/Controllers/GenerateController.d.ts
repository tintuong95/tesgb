import { IGenerateController } from './Interfaces/IGenerateController';
import { UnitService } from '@services/UnitService';
import { UserDto } from 'Shared/user.dto';
import { Unit } from '@entities/Unit';
import { MailService } from '../Services/MailService';
export declare class GenerateController implements IGenerateController {
    private unitService;
    private mailService;
    constructor(unitService: UnitService, mailService: MailService);
    unitsGenerate(user: UserDto): Promise<Unit[]>;
    testMail(user: UserDto): Promise<any>;
    testLog(user: UserDto): Promise<any>;
    testRemoveList(ids: {
        list: string[];
    }, user: UserDto): Promise<any>;
}
