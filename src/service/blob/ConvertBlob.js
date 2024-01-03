class ConvertBlob{

    async ConvertBlobToDocument(object){
        const link = document.createElement('a')
        link.href = URL.createObjectURL(object.blob)
        link.download = object.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

}

export default new ConvertBlob()