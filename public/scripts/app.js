// Client facing scripts here

$(document).ready(function() {
  // replaces menu w/ the order form
  $("#place_order_button").on('click', function() {
    const orderForm = $("#orderForm");
    const menu = $(".menuContainer");
    const heroHeader = $(".heroHeader");

    // updates hero header
    heroHeader.html(`<h2 class="text-center">Order Form</h2>`);

    // toggle form on, toggle menu off
    orderForm.removeClass("hidden");
    menu.addClass("hidden");
    $(this).addClass("hidden");
  });
});
