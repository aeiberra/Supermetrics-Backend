import https from 'https'
import { BASE_URL } from '..'

export const httpsRequest = async ({ body, ...options }: { body: string, options: object }): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: BASE_URL,
      ...options.options
    },
    res => {
      // const { statusCode } = res

      const chunks: any[] = []

      res.on('data', data => chunks.push(data))

      res.on('end', () => {
        let resBody = Buffer.concat(chunks)

        switch (res.headers['content-type']) {
          case 'application/json':
            resBody = JSON.parse(resBody.toString())
            break
        }

        // Any 2xx status code signals a successful response but
        // here we're only checking for 200.
        // if (statusCode !== 200) {
        //   reject(new Error(JSON.stringify(resBody)))
        // }
        resolve(resBody)
      })
    })
    req.on('error', reject)
    if (body !== '') {
      req.write(body)
    }
    req.end()
  })
}
