document.getElementById("frame").innerHTML = myFunction();

function myFunction() {
    alert(this);
    return this;
  }