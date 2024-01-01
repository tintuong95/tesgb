export declare class CreateLogDto {
    logType: number;
    content: string;
    accountId: string;
}
declare const UpdateLogDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLogDto>>;
export declare class UpdateLogDto extends UpdateLogDto_base {
}
export {};
