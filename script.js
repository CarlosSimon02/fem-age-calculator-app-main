var form = document.getElementById("emailForm");
form.noValidate = true;

form.onsubmit = function(e) {
    e.preventDefault();
    this.reportValidity();

    document.getElementById("error").style.display = "none";
    if (this.checkValidity()) return form.submit();
    document.getElementById("error").style.display = "block";
}