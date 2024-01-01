"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileConfig = void 0;
const path_1 = require("path");
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
const fs_extra_1 = require("fs-extra");
const createSlug_1 = require("../Utils/createSlug");
const regex_1 = require("../Utils/regex");
const uploadFileConfig = (size, type) => {
    return {
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(type)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let localSavePath = '';
                if (file.mimetype.match(regex_1.REGEX_IMAGE)) {
                    localSavePath = 'images';
                }
                else if (file.mimetype.match(regex_1.REGEX_RAR)) {
                    localSavePath = 'files';
                }
                const uploadPath = (0, path_1.join)(__dirname, '..', '..', 'uploads', localSavePath);
                if (!(0, fs_extra_1.existsSync)(uploadPath)) {
                    (0, fs_extra_1.mkdirSync)(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const name = (0, path_1.parse)(file.originalname).name;
                const ext = (0, path_1.parse)(file.originalname).ext;
                const newFilename = `${(0, createSlug_1.default)(name)}${ext}`;
                cb(null, newFilename);
            },
        }),
    };
};
exports.uploadFileConfig = uploadFileConfig;
//# sourceMappingURL=multer.config.js.map