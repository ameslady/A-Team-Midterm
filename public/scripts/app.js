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
    const textArea = $('input');
    const inputText = textArea.val();

    // shows error message
    if (!inputText) {
      event.preventDefault();
      const emptyError = $('.order-error').text(`⚠️ Don't forget your Name & Phone Number!`);
      emptyError.hide();
      emptyError.css({
        'color': '#FFFFFF',
        'margin-top': '10px',
        'display': 'inline-block',
      }).slideDown(1500).fadeOut(4000);
    }
  });

});

