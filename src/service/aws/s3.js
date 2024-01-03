import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const AWS_BUCKET_NAME = "myawsabet1"
const AWS_BUCKET_REGION = "us-east-1"
const AWS_PUBLIC_KEY = "AKIA6KOLC2EWEMDWIFB4"
const AWS_SECRET_KEY = "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"

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        secretAccessKey: AWS_SECRET_KEY,
        accessKeyId: AWS_PUBLIC_KEY
    }
 })

class AWS_S3{

    async Upload(file){
        const len = file.name.split('.')
        const extension = len[len.length - 1]
        const key = uuidv4() + '.' + extension

        const request = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Body: file,
            Key: key
          });
    
        try{
            await client.send(request)
            return {
                key: key,
                success: true
            }
        }catch(e){
            return {
                key: e,
                success: false
            }
        }
    }

    async GetByKey(key, name = ''){
        const request = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: key
        })
        
        const s = key.split('.')
        const extension = s[s.length - 1]

        if(name === '') name = key

        const result = await client.send(request)
        const array = await result.Body.transformToByteArray()
        const blob = new Blob([array], {type: result.ContentType})
        return {
            blob: blob,
            name: `${name}.${extension}`
        }
    }
}

export default new AWS_S3

