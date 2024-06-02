function onSignIn(response) {
  // Decode the credential response
  const responsePayload = parseJwt(response.credential);

  console.log('ID: ' + responsePayload.sub); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + responsePayload.name);
  console.log('Image URL: ' + responsePayload.picture);
  console.log('Email: ' + responsePayload.email);

  sessionStorage.setItem('userName', responsePayload.name);
  sessionStorage.setItem('userEmail', responsePayload.email);
  sessionStorage.setItem('userPicture', responsePayload.picture);

  $(".data").css("display", "block");
  $(".g_id_signin").css("display", "none");
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function signOut() {
  google.accounts.id.disableAutoSelect();
  alert("You have been signed out successfully");
  $(".g_id_signin").css("display", "block");
  $(".data").css("display", "none");
}

document.getElementById('useChatbotBtn').addEventListener('click', function() {
  window.location.href = 'chat.html';
});
