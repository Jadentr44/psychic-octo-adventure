// creating a list element and checking if it exist in local storage
let list;
if (localStorage.getItem("list") ) {
  console.log(JSON.parse(localStorage.getItem("list")));
  list = JSON.parse(localStorage.getItem("list"));
} else {
  list = [];
}

// adding event listners for adding items
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#itemInput");

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

// function to add item from input to list
function addItem() {
  if (input.value == "") return;
  let obj = { name: input.value, price: null };
  console.log(list);
  list.push(obj);
  generateList();
  input.value = "";
}

// generate list in html and saving to LS
function generateList() {
  let listEl = document.querySelector("#list");
  let total = 0;

  let missing = []
  let found = []

  list.forEach(e=>{
    if(e.price) return found.push(e)
    missing.push(e)
  })
  list = missing.concat(found)

  listEl.innerHTML = "";
  localStorage.setItem("list", JSON.stringify(list));
  document.querySelector("#countTotal").innerHTML = list.length;
  document.querySelector("#count").innerHTML = 0;

  if (list.length == 0) {
    listEl.innerHTML = "<li class='text-center'>Empty list</li>";
    document.querySelector("#listTotal").innerHTML = 0;
    return;
  }
  list.forEach((e, i) => {
    if (e.price) {
      document.querySelector("#count").innerHTML = parseInt(document.querySelector("#count").innerHTML) + 1;
      total += parseInt(e.price)};
    listEl.innerHTML += `<li   class='flex justify-between px-4 py-2 text-xl font-bold'>
    <h3 onclick="checkItem(${i})"><input class="checkbox" style="pointer-events: none;"   type='checkbox' ${
      e.price ? "checked" : ""
    } />
    <span class = '${
      e.price !== null ? "text-gray-500 line-through	" : " text-black"
    }'>
    ${e.name}
    </span>
    
    </h3>
    
    <div class="flex items-center gap-2">
    ${e.price ? "$" + e.price : ""}
           <img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png" onclick="deleteLi(${i})" class='w-6 h-6 '></li></div>`;
  });

  document.querySelector("#listTotal").innerHTML = total;
  console.log(list);
}

function deleteLi(index) {
  console.log("deleting:", index);
  list.splice(index, 1);
  generateList();
}
function checkItem(index) {
  modal.style.display = "block";
  document.querySelector("#modal-content").innerHTML = `
  <h2 class="text-lg text-center">How much was ${list[index].name}?</h2>
  <div class="mx-auto w-fit">$<input ${list[index].price?`value="${list[index].price}"`:""} id="itemPrice" class="border-2 outline-none w-36 " type="number"></div>
  <div class=" mx-auto w-fit">

    <button onclick="addPrice(${index})" class="border-2 border-black px-4 py-1 mx-5 text-xl">save</button>
    ${
      list[index].price
        ? `<button onclick="removePrice(${index})" class="border-2 border-black px-4 py-1 mx-5 text-xl">remove</button>`
        : `<button onclick="closeModal()" class="border-2 border-black px-4 py-1 mx-5 text-xl">cancel</button>`
    }
    
  `;
}
function closeModal() {
  console.log("closing")
  modal.style.display = "none";
}
function addPrice(index) {
  if (document.querySelector("#itemPrice").value == "") return;
  list[index].price = document.querySelector("#itemPrice").value;
  generateList();
  closeModal();
}
function removePrice(index) {
  list[index].price = null;
  generateList();
  closeModal();
}
let modal = document.querySelector("#modal");
window.onclick = function (event) {
  if (event.target == modal) {
    console.log("2")
    closeModal();
  }
};
generateList();
