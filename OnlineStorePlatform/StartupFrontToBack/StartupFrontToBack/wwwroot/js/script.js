// PRODUCT
$(document).ready(function () {
    let skip = 8;
    let proCount = $("#count").val();
    $(document).on('click', '#loadMore', function () {
        $.ajax({
            url: '/Product/loadMore?skip' + skip,
            type: 'GET',
            success: function (res) {
                console.log(proCount)
                $('#productList').append(res);

                if (skip >= proCount) {
                    $('#loadMore').remove();
                }
                skip += 8;
                //for (let pro of res) {
                //    //console.log(pro)
                //    let mainDiv = $('<div>').addClass("col-sm-6 col-md-4 col-lg-3 mt-3");
                //    let productDiv = $('<div>').addClass("product-item text-center");
                //    //console.log(productDiv) 
                //    let imgDiv = $('<div>').addClass("img");
                //    let a = $('<a>');
                //    let img = $('<img>').attr("src", "/img/" + pro.image).addClass("img-fluid");
                //    a.append(img);
                //    imgDiv.append(a); 

                //    let divTitle = $('<div>').addClass("title mt-3"); 
                //    let h6 = $('<h6>').text(pro.title); 
                //    divTitle.append(h6); 

                //    let divPrice = $('<div>').addClass("price");
                //    let spanCard = $('<span>').addClass("text-black-50").text("Add to cart");
                //    let spanPrice = $('<span>').addClass("text-black-50").text("$"+pro.price);
                //    divPrice.append(spanCard, spanPrice); 

                //    productDiv.append(imgDiv, divTitle, divPrice); 
                //    mainDiv.append(productDiv); 
                //    $('#productList').append(mainDiv); 
                //} 
            }
        })
    })

}); 

  


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



