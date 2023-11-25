function checkInputs() {
  if (!inputFilled()) return missingInfo();
  calculatePrice();
}
// let modal = document.querySelector("#modal");
document
  .getElementById("compareModalBtn")
  .addEventListener("click", function () {
    document.querySelector("#priceModal").style.display = "block";
   
  });

  let priceModal = document.querySelector("#priceModal");
  window.onclick = function (event) {
    if (event.target == priceModal) {
      closePriceModal();
    }
  };
  function closePriceModal() {
    priceModal.style.display = "none";
  }
function inputFilled() {
  let inputsArr = document.querySelectorAll(".input");
  let empty = false;
  for (let i = 0; i < inputsArr.length; i++) {
    const e = inputsArr[i];
    if (e.value == "") empty = true;
  }

  if (empty) return false;
  return true;
}

function calculatePrice() {
  let price1 = document.querySelector("#Prc1").value;
  let price2 = document.querySelector("#Prc2").value;

  let quantity1 = document.querySelector("#Qty1").value;
  let quantity2 = document.querySelector("#Qty2").value;

  let ratio1 = (price1 / quantity1).toFixed(2);
  let ratio2 = (price2 / quantity2).toFixed(2);
  console.log("ratio 1:", ratio1);
  console.log("ratio 2:", ratio2);
}

function missingInfo() {
  alert("there is missing info");
}
