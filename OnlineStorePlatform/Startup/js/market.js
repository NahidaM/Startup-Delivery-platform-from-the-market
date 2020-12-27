if (document.getElementById("form")) {
    document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();
  
      let magazaadi = document.getElementById("magazaadi").value;
      let magazanovu = document.getElementById("magazanovu").value;
      let magazalogosu = document.getElementById("magazalogosu").value;
      let acilisvaxti = document.getElementById("acilisvaxti").value;
      let acilisvaxti2 = document.getElementById("acilisvaxti2").value;
      let email = document.getElementById("email").value;
      let mobil = document.getElementById("mobil").value;
      let password = document.getElementById("password").value;
      let password2 = document.getElementById("password2").value;
      let oldItems = JSON.parse(localStorage.getItem("mehsullar")) || [];
  
      let newItem = {
        magazaadi: magazaadi,
        magazanovu: magazanovu,
        magazalogosu: magazalogosu,
        acilisvaxti: acilisvaxti,
        acilisvaxti2: acilisvaxti2,
        email: email,
        mobil: mobil,
        password: password,
        password2: password2,
      };
      oldItems.push(newItem);
      localStorage.setItem("mehsullar", JSON.stringify(oldItems));
    });
  }
  if (document.getElementsByClassName("elan")[0]) {
    let res = localStorage.getItem("mehsullar");
    if (res) {
      res = [...JSON.parse(localStorage.getItem("mehsullar"))];
  
      let elanlar = document.getElementsByClassName("elan")[0];
      res.forEach((a) => {
        elanlar.innerHTML += `
  
            <div class="onep">
        
            <div class="threep">
                <p><span> Magaza Adi:</span>${a.magazaadi}</p>
                <p><span>Magaza Novu:</span>${a.magazanovu}</p>
                <p><span>Is Baslamasi:</span>${a.acilisvaxti}</p>
                <p><span>Is Bitmesi:</span>${a.acilisvaxti2}</p>
                <p><span>Email:</span>${a.email}</p>
                <p><span>Mobil:</span>${a.mobil}</p>
            </div>
        </div>
  `;
      });
    }
  }