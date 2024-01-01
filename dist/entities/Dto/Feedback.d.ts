export declare class CreateFeedbackDto {
    customerId: string;
    rating: number;
    comment: string;
    accountId: string;
}
declare const UpdateFeedbackDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFeedbackDto>>;
export declare class UpdateFeedbackDto extends UpdateFeedbackDto_base {
}
export {};
