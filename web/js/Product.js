data = [
  {
    make: "Gibson",
    model: "Les Paul",
    type: "Electric",
    price: "$3,000",
    image: "../images/m1.jpg",
  },
  {
    make: "Gibson",
    model: "SG",
    type: "Electric",
    price: "$1,500",
    image: "../images/m2.jpg",
  },
  {
    make: "Fender",
    model: "Telecaster",
    type: "Electric",
    price: "$2,000",
    image: "../images/m3.jpg",
  },
  {
    make: "Fender",
    model: "Stratocaster",
    type: "Electric",
    price: "$2,000",
    image: "../images/m4.jpg",
  },
  {
    make: "Gretsch",
    model: "White Falcon",
    type: "Electric",
    price: "$5,000",
    image: "../images/m5.jpg",
  },
  {
    make: "Paul Reed Smith",
    model: "Custom 24",
    type: "Electric",
    price: "$5,000",
    image: "../images/m6.jpg",
  },
  {
    make: "Gibson",
    model: "Hummingbird",
    type: "Acoustic",
    price: "$2,500",
    image: "../images/m7.jpg",
  },
];

var products = "",
  makes = "",
  models = "",
  types = "";

for (var i = 0; i < data.length; i++) {
  var make = data[i].make,
    model = data[i].model,
    type = data[i].type,
    price = data[i].price,
    rawPrice = price.replace("$", ""),
    rawPrice = parseInt(rawPrice.replace(",", "")),
    image = data[i].image;

  //create product cards
  products +=
    "<div class='col-sm-4 product' data-make='" +
    make +
    "' data-model='" +
    model +
    "' data-type='" +
    type +
    "' data-price='" +
    rawPrice +
    "'><div class='product-inner text-center'><img src='" +
    image +
    "'><div class='prdctdetails'><div class='dflx'><span>Make:<br/>  " +
    "<strong>" +
    make +
    "</strong>" +
    "</span><span>Model:<br/> " +
    "<strong>" +
    model +
    "</strong>" +
    "</span></div><div class='dflx'><p>Type: " +
    "<strong>" +
    type +
    "</strong>" +
    "</p ><p class='prc'>Price: " +
    "<strong class='bleclr'>" +
    price +
    "</strong>" +
    "</p></div> " +
    "<a class='prdctbtn' href='https://wa.me/+8801889992881' target='_blank'>Buy now</a>" +
    "</div></div></div>";

  //create dropdown of makes
  if (
    makes.indexOf("<option value='" + make + "'>" + make + "</option>") == -1
  ) {
    makes += "<option value='" + make + "'>" + make + "</option>";
  }

  //create dropdown of models
  if (
    models.indexOf("<option value='" + model + "'>" + model + "</option>") == -1
  ) {
    models += "<option value='" + model + "'>" + model + "</option>";
  }

  //create dropdown of types
  if (
    types.indexOf("<option value='" + type + "'>" + type + "</option>") == -1
  ) {
    types += "<option value='" + type + "'>" + type + "</option>";
  }
}

$("#products").html(products);
$(".filter-make").append(makes);
$(".filter-model").append(models);
$(".filter-type").append(types);

var filtersObject = {};

//on filter change
$(".filter").on("change", function () {
  var filterName = $(this).data("filter"),
    filterVal = $(this).val();

  if (filterVal == "") {
    delete filtersObject[filterName];
  } else {
    filtersObject[filterName] = filterVal;
  }

  var filters = "";

  for (var key in filtersObject) {
    if (filtersObject.hasOwnProperty(key)) {
      filters += "[data-" + key + "='" + filtersObject[key] + "']";
    }
  }

  if (filters == "") {
    $(".product").show();
  } else {
    $(".product").hide();
    $(".product").hide().filter(filters).show();
  }
});

//on search form submit
$("#search-form").submit(function (e) {
  e.preventDefault();
  var query = $("#search-form input").val().toLowerCase();

  $(".product").hide();
  $(".product").each(function () {
    var make = $(this).data("make").toLowerCase(),
      model = $(this).data("model").toLowerCase(),
      type = $(this).data("type").toLowerCase();

    if (
      make.indexOf(query) > -1 ||
      model.indexOf(query) > -1 ||
      type.indexOf(query) > -1
    ) {
      $(this).show();
    }
  });
});
