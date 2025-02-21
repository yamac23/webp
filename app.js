// Connecting to Supabase with the URL and anon API key
const supabaseUrl = 'https://iluhajqkkdcophmyttvc.supabase.co';  // Add your Supabase URL here
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdWhhanFra2Rjb3BobXl0dHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjIyODQsImV4cCI6MjA1NTczODI4NH0.6Kct1CWM6z59Zta1oiE1W187V742T3hTvBu7dsnKaao';  // Add your Supabase API key here
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// File upload function
async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file!");
        return;
    }

    // Show status message while uploading
    document.getElementById("status").innerText = "Uploading...";

    try {
        // Uploading file to Supabase Storage
        const { data, error } = await supabase
            .storage
            .from('uploads')  // The bucket name (uploads)
            .upload(`public/${file.name}`, file); // Upload the file to the 'public/' directory

        if (error) {
            throw error;
        }

        // Update the status message on successful upload
        document.getElementById("status").innerText = "Upload successful!";
        listFiles(); // List files after uploading
    } catch (error) {
        console.error("Error uploading file:", error);
        document.getElementById("status").innerText = "Upload failed.";
    }
}

// Function to list uploaded files
async function listFiles() {
    try {
        const { data, error } = await supabase
            .storage
            .from('uploads')
            .list('public', { limit: 10 });  // List the files in the 'public' directory with a limit of 10

        if (error) {
            throw error;
        }

        const fileList = document.getElementById("fileList");
        fileList.innerHTML = "";  // Clear the list

        data.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;  // Add file name to the list
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error listing files:", error);
    }
}

// List files when the page loads
window.onload = listFiles;
