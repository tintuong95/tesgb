export declare class CreateReportDto {
    reportType: string;
    content: string;
    accountId: string;
}
declare const UpdateReportDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReportDto>>;
export declare class UpdateReportDto extends UpdateReportDto_base {
}
export {};
