// Cloudinary API endpoint
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dwnyfntvd/upload';

// Dosya yükleme işlemi
function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file); // Yüklemek istediğiniz dosyayı ekleyin
    formData.append('upload_preset', 'upload'); // Burada 'upload' şablonunu kullanıyoruz

    // Axios ile POST isteği gönderme
    axios.post(cloudinaryUrl, formData)
        .then(response => {
            console.log('Dosya başarıyla yüklendi!', response.data);
            // Yanıtla dosya bilgilerini işle
            const fileUrl = response.data.secure_url;
            document.getElementById("file-info").innerHTML = `
                Dosya başarıyla yüklendi!
                Dosya URL'si: <a href="${fileUrl}" target="_blank">${fileUrl}</a>
            `;
            // Yüklenen dosyayı listeye ekleyin
            let fileList = document.getElementById("file-list");
            let listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${fileUrl}" target="_blank">Yüklenen Dosya</a>`;
            fileList.appendChild(listItem);
        })
        .catch(error => {
            console.error('Dosya yükleme hatası:', error);
            alert('Dosya yüklenirken bir hata oluştu.');
        });
}

// Dosya seçildiğinde upload işlemi başlat
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
});
