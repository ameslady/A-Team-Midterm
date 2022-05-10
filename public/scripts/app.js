// Client facing scripts here
// Jquery and Ajax will go here!

// const createOrderElement = function(data) {
//   let $orderForm = $(`
//       <form action="/orders" method="POST">
//         <div class="form-group">
//           <input class="form-control" type="name" name="name" placeholder="Enter name">
//         </div>
//         <div class="form-group">
//           <input class="form-control" type="phone" name="phone" placeholder="Phone number">
//         </div>
//         <button type="submit" class="btn btn-outline-dark">Place Order</button>
//       </form>`);

//   return $orderForm;

// };

$(document).ready(function() {
  // event.preventDefault();
  $("#place_order_button").on('click', function() {
    // alert("place order was clicked!");

    const orderForm = $(".orderForm");
    orderForm.removeClass("orderForm");

    const menu = $(".menu");
    menu.addClass("hidden");
});




});
