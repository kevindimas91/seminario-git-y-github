document.getElementById("viewButton").addEventListener('click', function() {
    document.getElementById("result").style.display = "block";
})

document.getElementById("closeButton").addEventListener('click', function() {
    document.getElementById("result").style.display = "none";
    document.querySelector(".start-container").style.display = "none";
    document.querySelector(".options-container").style.display = "block";
})
