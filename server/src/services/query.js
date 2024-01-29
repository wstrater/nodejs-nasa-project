
const DEFAULT_LIMIT = 50;
const DEFAULT_PAGE = 1;

function getPagination(query) {
    console.log('getPagination', query);

    query = query || {};

    const ret = {
        skip: 0,
        limit: 0
    }

    if (query.limit) {
        ret.limit = Math.abs(query.limit);
    }

    if (query.skip) {
        ret.skip = Math.abs(query.skip);
    } else if (query.page) {
        ret.page = Math.abs(query.page);
        if (ret.page > 0) {
            ret.skip = ret.limit * (ret.page - 1);
            if (ret.limit <= 0) {
                ret.limit = DEFAULT_LIMIT
            }
        }
    }

    console.log('getPagination', ret);

    return ret;
}

module.exports = {
    getPagination
}