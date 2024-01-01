import { ValidationOptions } from 'class-validator';
interface IsFileOptions {
    mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
}
export declare function IsFile(options: IsFileOptions, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export {};
