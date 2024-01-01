"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHandler = exports.pagination = void 0;
const common_1 = require("@nestjs/common");
function pagination(req, data, currentPage, perPage) {
    const totalPage = Math.ceil(Number(data[1] / perPage));
    const { currentLink, previousLink, nextLink, links } = paginationLinks(req, data, currentPage, perPage);
    if (currentPage > totalPage || data[0].length == 0) {
        throw new common_1.NotFoundException('Not found');
    }
    return {
        meta: {
            currentPage,
            from: currentPage * perPage - perPage + 1,
            to: currentPage * perPage - perPage + data[0].length,
            perPage,
            total: data[1],
            currentLink,
            previousLink,
            nextLink,
            lastPage: totalPage,
        },
        data: data[0],
        links,
    };
}
exports.pagination = pagination;
function paginationLinks(req, data, currentPage, perPage) {
    let links = [];
    const url = getUrlRequest(req);
    const totalPage = Math.ceil(Number(data[1] / perPage));
    const nextLink = currentPage < totalPage
        ? url + '?' + mapQuery(req.query, currentPage + 1)
        : url + '?' + mapQuery(req.query, currentPage);
    const previousLink = currentPage - 1 > 0
        ? url + '?' + mapQuery(req.query, currentPage - 1)
        : url + '?' + mapQuery(req.query, currentPage);
    for (let i = 1; i <= totalPage; i++) {
        links.push(url + '?' + mapQuery(req.query, i));
    }
    return {
        nextLink: nextLink,
        links,
        previousLink: previousLink,
        currentLink: url + '?' + mapQuery(req.query, currentPage),
    };
}
function getUrlRequest(req) {
    const protocol = req.protocol;
    const host = req.headers.host;
    const path = req.path;
    return protocol + '://' + host + path;
}
function mapQuery(query, currentPage) {
    return Object.entries(query)
        .map((item) => {
        if (item[0] === 'currentPage') {
            item[1] = currentPage;
        }
        return `${item[0]}=${item[1]}`;
    })
        .join('&');
}
function queryHandler(query) {
    const { currentPage = 1, perPage = 10 } = query;
    const skip = +perPage * +currentPage - +perPage;
    return {
        skip,
        take: perPage,
        currentPage: +currentPage,
        perPage: +perPage,
    };
}
exports.queryHandler = queryHandler;
//# sourceMappingURL=pagination.js.map