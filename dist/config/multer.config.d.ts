/// <reference types="multer" />
export declare const uploadFileConfig: (size: any, type: any) => {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
