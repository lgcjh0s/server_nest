const Http = () => {

    const charset: string = 'EUC-KR';
    const request = require('request');
    const iconv = require('iconv-lite');

    const doPost = (url: string, params: object = null): Promise<string> => {
        
        return new Promise((resolve, reject) => {
            request.post({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url,
                encoding: null,
                body: {},
                form: params,
                json: true
            }, (error: object, response: object, body: object) => {
                if (body) {
                    const html: string = iconv.decode(body, charset);
                    resolve(html);
                } else {
                    reject(error);
                }
            })
        });
    };

    return {
        doPost
    }
};

export {
    Http
}



