// Client facing scripts here

$(document).ready(function() {
  // replaces menu w/ the order form
  $("#place_order_button").on('click', function() {
    const orderForm = $("#orderForm");
    const menu = $("#menu");

    // toggle form on, toggle menu off
    orderForm.removeClass("hidden");
    menu.addClass("hidden");
    $(this).addClass("hidden");
  });
});

// const createOrdeFormElement = function(data) {
//   let $orderForm = $(`
//   <form class="orderForm" action="/orders" method="POST">
//   <div class="form-group">
//     <input class="form-control" type="name" name="name" placeholder="Enter name"/>
//   </div>
//   <div class="form-group">
//     <input class="form-control" type="phone" name="phone" placeholder="Phone number"/>
//   </div>

//   <div class="form-check form-check-inline">
//     <input class="form-check-input" name="smallBattery" type="checkbox" id="inlineCheckbox1" value="1"/>
//     <label class="form-check-label" for="inlineCheckbox1">Small Battery</label>
//     <select class="form-control form-control-sm" name="quantity_sm">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//       <option>6</option>
//       <option>7</option>
//       <option>8</option>
//       <option>9</option>
//       <option>10</option>
//     </select>
//   </div>
//   <div class="form-check form-check-inline">
//     <input class="form-check-input" name="medBattery" type="checkbox" id="inlineCheckbox2" value="2"/>
//     <label class="form-check-label" for="inlineCheckbox2">Medium Battery</label>
//     <select class="form-control form-control-sm" name="quantity_med">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//       <option>6</option>
//       <option>7</option>
//       <option>8</option>
//       <option>9</option>
//       <option>10</option>
//     </select>
//   </div>
//   <div class="form-check form-check-inline">
//     <input class="form-check-input" name="lgBattery" type="checkbox" id="inlineCheckbox3" value="3" />
//     <label class="form-check-label" for="inlineCheckbox3">Large Battery</label>
//     <select class="form-control form-control-sm" name="quantity_lg">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//       <option>6</option>
//       <option>7</option>
//       <option>8</option>
//       <option>9</option>
//       <option>10</option>
//     </select>
//   </div>
//   <div>
//     <button type="submit" class="btn btn-outline-dark">Complete</button>
//   </div>
// </form>`);
//   return $orderForm;
// };
