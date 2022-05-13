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

  const errorMessage = $(".order-error");
  errorMessage.hide();

  // checks if there are values in the name & phone text area
  $("#completeOrder").on('click', function(event) {
    const inputName = $('#input-name').val();
    const inputNum = $('#input-num').val();
    const ck_box = $('input[type="checkbox"]:checked').length;

    // invalid name or number error
    if (!inputName || !inputNum || ck_box === 0) {
      event.preventDefault();
      const emptyError = $('.order-error').text(`⚠️  Don't forget your name, phone number and a menu selection.`);
      emptyError.hide();
      emptyError.css({
        'color': '#da4a54',
        'margin-top': '10px',
        'display': 'inline-block',
        'font-weight': 'bold'
      }).slideDown(1500).fadeOut(4000);
    }

  });

});

