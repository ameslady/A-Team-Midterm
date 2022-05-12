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
    // event.preventDefault();

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

  // $('#completeOrder').on('click', function(event) {

  //   console.log('tinybattery', $('input[name="tinyBattery"]').prop("checked"));
  //   console.log('xsbattery', $('input[name="xsBattery"]').prop("checked"));
  //   console.log('smbattery', $('input[name="smBattery"]').prop("checked"));
  //   console.log('medbattery', $('input[name="medBattery"]').prop("checked"));
  //   console.log('lgbattery', $('input[name="lgBattery"]').prop("checked"));
  //   console.log('xlbattery', $('input[name="xlBattery"]').prop("checked"));
  // if($('input[name="tinyBattery"]').prop("checked") == true){
  //     console.log("Checkbox is checked.", $('input[name="tinyBattery"]').prop("checked"));
  // }
  // else if($(this).prop("checked") == false){
  //     console.log("Checkbox is unchecked.");
  // }
  // });

  // $('#completeOrder').on('click', function(event){
  //     if(($('input[name="tinyBattery"]').prop("checked") === true & $('input[name="xsBattery"]').prop("checked") === true & $('input[name="smallBattery"]').prop("checked") === true & $('input[name="medBattery"]').prop("checked") === true & $('input[name="lgBattery"]').prop("checked")) === true & $('input[name="xlBattery"]').prop("checked") === true){
  //         console.log("no box checked");
  //     }
  // });



});

