import axios from 'axios';

const NEWS_API_URL = process.env.REACT_APP_NEWS_API_URL;

const createOptions = (httpmethod, url, requestBody) => {
    let options = {
        method: httpmethod,
        url: url,
        data: requestBody,
        headers: {
            'content-type': 'application/json',
        },
    };

    console.log(options);

    return options;
};

const requestPath = (httpmethod, category) => {
    let url = NEWS_API_URL;
    let body = {};

    if (category.usequery) {
        body = {
            checkeverything: true,
            query: category.title,
        };
    } else if (category.title) {
        body = {
            category: category.title,
        };
    }

    return axios.request(createOptions(httpmethod, url, body));
};

const getData = (category) => {
    return requestPath('POST', category).then((res) => {
        return JSON.parse(res.data);
    });
};

export { getData };
