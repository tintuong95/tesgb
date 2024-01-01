"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOptionWhere = void 0;
const moment = require("moment");
const typeorm_1 = require("typeorm");
const findOptionWhere = (query, fieldSearch) => {
    const newQuery = Object.assign({}, query);
    fieldSearch.forEach((item) => {
        if (newQuery[item])
            newQuery[item] = (0, typeorm_1.Like)(`%${newQuery[item]}%`);
    });
    if (newQuery.start && newQuery.end) {
        const startTime = moment(newQuery.start, 'YYYY-MM-DD').toISOString();
        const endTime = moment(newQuery.end, 'YYYY-MM-DD').toISOString();
        newQuery['createdAt'] = (0, typeorm_1.Between)(startTime, endTime);
    }
    delete newQuery.perPage;
    delete newQuery.currentPage;
    delete newQuery.start;
    delete newQuery.end;
    return newQuery;
};
exports.findOptionWhere = findOptionWhere;
//# sourceMappingURL=query.js.map