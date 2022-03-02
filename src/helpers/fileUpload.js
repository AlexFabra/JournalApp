//para subir una file a cloudinary
export const fileUpload = async (file) => {
    //return url de la imagen
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dlmdj7zsu/upload'
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try{
        const resp = await fetch (cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(resp.ok){ 
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else { //error de claudinary
            throw await resp.json();
        }

    }catch(error){ //url no existe o similares.
        console.log(error);
        throw error;
    }
    
}