const inputContainer = document.querySelector("#inputContainer");

function addInput(input) {
    let rows = inputContainer.querySelectorAll(".inpute__row");
    if(rows.length < 10) {
        // Новая строка
        let newRow = document.createElement("div");
        newRow.setAttribute("class", "inpute__row");
        // input
        let newInput = document.createElement("input");
        newInput.setAttribute("type", "file");
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Удалить";
        removeBtn.setAttribute("onclick", "removeInput(this)");

        newRow.appendChild(newInput);
        newRow.appendChild(removeBtn);

        inputContainer.appendChild(newRow);
    } else {
        console.log("Более не добавить ! Максимум 10 !");
    }
}

function removeInput(input) {
    input.parentNode.remove();
}