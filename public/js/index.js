function checkEmpty() {
$('#form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    // everything looks good!
    window.location.href = 'home';
  }
})
}

