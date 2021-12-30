const https = require('https')

export async function request(options: any) {
    return await new Promise((resolve, reject) => {
        var body = "";
        const req = https.request(options, (res: any) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d: any) => {
                body += d;
            })
            res.on('end', () => {
                res['body'] = body ? body : undefined;
                resolve(res)
            })
        })
        req.on('error', (error: any) => {
            console.error(error)
            reject(error);
        })
        req.end()
    })

}