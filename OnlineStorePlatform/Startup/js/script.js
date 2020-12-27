// PRODUCT

$(document).on("click", ".categories", function (e) {
  e.preventDefault();
  $(this).next().next().slideToggle();
});

$(document).on("click", ".category li a", function (e) {
  e.preventDefault();
  let category = $(this).attr("data-id");
  let products = $(".product-item");

  products.each(function () {
    if (category == $(this).attr("data-id")) {
      $(this).parent().fadeIn();
    } else {
      $(this).parent().hide();
    }
  });
  if (category == "all") {
    products.parent().fadeIn();
  }
});

//

if (document.getElementById("form")) {
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    let marketname = document.getElementById("marketname").value;
    let markettype = document.getElementById("markettype").value;
    let productname = document.getElementById("productname").value;
    let productcategory = document.getElementById("productcategory").value;
    let tel = document.getElementById("tel").value;
    let location = document.getElementById("location").value;
    let email = document.getElementById("email").value;
    let file = document.getElementById("file").value;
    let oldItems = JSON.parse(localStorage.getItem("mehsullar")) || [];

    let newItem = {
      marketname: marketname,
      markettype: markettype,
      productname: productname,
      productcategory: productcategory,
      tel: tel,
      location: location,
      email: email,
      file: file,
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
      Object.values(a).forEach((t) => {
        elanlar.innerHTML += `<div>${t}</div>`;
      });
    });
  }
}

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
});

$(document).ready(function () {
  $(document).on("keyup", "#search-input", function () {
    let searchInput = $(this).val().trim();
    $("#search-list li").remove();
    if (searchInput.length > 0) {
      $.ajax({
        url: "/Home/Search?search=" + searchInput,
        type: "Get",
        success: function (res) {
          $("#search-list").append(res);
        },
      });
    }
  });
});



