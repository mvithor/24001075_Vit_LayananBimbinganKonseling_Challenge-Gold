
    // Elemen input tanggal lahir
    var inputTanggalLahir = document.getElementById("tanggal_lahir");

    // Event listener untuk event focus
    inputTanggalLahir.addEventListener("focus", function() {
        // Ketika input mendapatkan fokus, ganti type-nya menjadi "date"
        this.type = "date";
    });

    // Event listener untuk event blur
    inputTanggalLahir.addEventListener("blur", function() {
        // Ketika input kehilangan fokus, jika value-nya kosong, ganti type-nya menjadi "text" dan tampilkan placeholder
        if (!this.value) {
            this.type = "text";
            this.placeholder = "Tanggal Lahir";
        }
    });

// script.js
document.addEventListener('DOMContentLoaded', async () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const errorMessageElement = document.getElementById('error-message');
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Mengambil data dari form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confPassword = document.getElementById('confPassword').value;
      const jenis_kelamin = document.getElementById('jenis_kelamin').value;
      const tanggal_lahir = document.getElementById('tanggal_lahir').value;
      const kelas = document.getElementById('kelas').value;
      const alamat = document.getElementById('alamat').value;

      // Validasi password
      if (password !== confPassword) {
          errorMessageElement.textContent = 'Password tidak sama';
          errorMessageElement.style.display = 'block';
          return; // Hentikan proses submit form
      }
  
      // Menampilkan loading spinner
      const loadingSpinner = document.createElement('div');
      loadingSpinner.id = 'loading-spinner';
      loadingSpinner.innerHTML = '<img src="../public/assets/spinning.gif" alt="Loading...">';
      signupForm.appendChild(loadingSpinner);
  
      // Mengirim data registrasi ke server
      try {
          const response = await fetch('/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name,
                  email,
                  password,
                  confPassword,
                  jenis_kelamin,
                  tanggal_lahir,
                  kelas,
                  alamat
              })
          });

          // Menangani respons dari server
          const responseData = await response.json();
          if (response.ok) { // Registrasi berhasil
              console.log('Registrasi berhasil!');
              // Redireksi ke halaman login atau tampil pesan sukses
              window.location.href = '/auth'; 
          } else { 
              errorMessageElement.textContent = responseData.message || 'Terjadi kesalahan. Silakan coba lagi.';
              errorMessageElement.style.display = 'block';
          }
      } catch (error) {
          console.error('Terjadi kesalahan saat registrasi', error);
          errorMessageElement.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
          errorMessageElement.style.display = 'block';
      } finally {
          // Menghapus loading spinner jika sudah ada
          if (loadingSpinner) {
            loadingSpinner.parentNode.removeChild(loadingSpinner);
}
      }
      
  });
   
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Mengambil nilai email dan password dari form
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    try {
        // Mengirim permintaan login ke server
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
       
        const data = await response.json();

        if (response.ok) {
            // Jika login berhasil, simpan access token dalam cookie
            document.cookie = `accessToken=${data.accessToken}; max-age=3600`; // Max age dalam detik (1 jam)
            document.cookie = `refreshToken=${data.refreshToken}; max-age=86400`; // Max age dalam detik (1 hari)

            // Redirect ke halaman yang sesuai
            window.location.href = data.redirectTo;
        } else {
            // Jika login gagal, tampilkan pesan kesalahan
            alert(data.msg);
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat melakukan login:', error);
        alert('Terjadi kesalahan saat melakukan login');
    }
    })
})
