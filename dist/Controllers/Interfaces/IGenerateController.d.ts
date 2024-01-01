import { Unit } from '@entities/Unit';
import { UserDto } from 'Shared/user.dto';
export interface IGenerateController {
    unitsGenerate(user: UserDto): Promise<Unit[]>;
}
