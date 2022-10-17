# text2image
API built that converts a string of text into images and returns them as a Buffer.

## Routes
- ```/api/get-pages```: returns the total number of pages given the data sent in the request.
- ```/api/converter```: returns a JSON object with the following structure:
```JSON
{
    "files": [
        {
            "type": "png or jpeg or pdf",
            "data": {
                "image buffer data",
            },
        },
    ],
}
```
- To save the data as an image, you can create an image from the buffer:
```javascript
    const responseData = JSON.parse(response.data)
    for (let image of responseData.files) {
       return Buffer.from(image) 
    }
```
