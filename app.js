// Supabase bağlantısını kurun
const supabaseUrl = 'https://iluhajqkkdcophmyttvc.supabase.co';  // Supabase projenizin URL'si
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdWhhanFra2Rjb3BobXl0dHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjIyODQsImV4cCI6MjA1NTczODI4NH0.6Kct1CWM6z59Zta1oiE1W187V742T3hTvBu7dsnKaao';  // API anahtarınız (anon key)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Dosya yükleme işlevi
document.getElementById('upload-button').addEventListener('click', async () => {
    const file = document.getElementById('file-input').files[0];
    if (file) {
        try {
            // Dosyayı Supabase'e yükle
            const { data, error } = await supabase
                .storage
                .from('uploads')  // 'uploads' bucket'ında saklanacak
                .upload(`public/${file.name}`, file);  // Dosya ismi ile yükleniyor

            if (error) throw error;
            
            alert('Dosya başarıyla yüklendi!');
            loadFiles();  // Dosya yüklendikten sonra dosyaları tekrar listele
        } catch (error) {
            console.error(error.message);
            alert('Dosya yüklenirken bir hata oluştu!');
        }
    } else {
        alert('Lütfen bir dosya seçin!');
    }
});

// Yüklenen dosyaları listeleme
async function loadFiles() {
    const { data, error } = await supabase
        .storage
        .from('uploads')
        .list('public');  // 'uploads' bucket'ındaki public dizinindeki dosyalar

    if (error) {
        console.error(error.message);
    } else {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';  // Önceden var olan dosya listesini temizle

        data.forEach(file => {
            const fileItem = document.createElement('div');
            const fileUrl = supabase.storage
                .from('uploads')
                .getPublicUrl(file.name).publicURL;  // Dosyanın herkese açık URL'sini al

            fileItem.innerHTML = `<a href="${fileUrl}" target="_blank">${file.name}</a>`;
            fileList.appendChild(fileItem);
        });
    }
}

// Sayfa yüklenince dosyaları yükle
loadFiles();
