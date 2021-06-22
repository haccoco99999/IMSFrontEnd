const { default: axiosClient } = require("./axiosClient");

class GetAll {
    postAll = (data) => {
        const url = '/all';
        return axiosClient.post(url,{data});
    };
}

const getAllGoodsIssue = new GetAll();

export default getAllGoodsIssue;

// class   GetDetail {
//     getDetail = (params) => {
//         const url = '/';
//         return axiosClient.get(url, { params });
//     };
// }

// const getDetailGoodsIssue = new GetDetail();
// export default getDetailGoodsIssue;

