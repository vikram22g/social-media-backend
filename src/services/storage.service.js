const {ImageKit}= require('@imagekit/nodejs')

// ye image kit ko connect karta hai
const imagekit = new ImageKit({
  privateKey: "private_pVcQvM9ZAmYW/uMSX8qmXnX6O/Q=" }) 


  // ye function image ko imagekit par upload kartah hai or ek url return karata hai jisko hum database me store karenge
async function uploadFile(buffer){
    console.log(buffer)
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })
    return result;
}

module.exports = uploadFile
