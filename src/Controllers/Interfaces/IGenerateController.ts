import {Unit} from '@entities/Unit';
import {UserDto} from 'Shared/user.dto';

export interface IGenerateController {
	/**
	 * generate multiple units
	 */
	unitsGenerate(user: UserDto): Promise<Unit[]>;
}
