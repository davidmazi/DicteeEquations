// Note: Replace the URL with a valid endpoint to retrieve
//       authorization tokens for your subscription.
var authorizationEndpoint = "token.php";

function RequestAuthorizationToken() {
  if (authorizationEndpoint) {
    var a = new XMLHttpRequest();
    a.open("GET", authorizationEndpoint);
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    a.send("");
    a.onload = function() {
      var token = JSON.parse(atob(this.responseText.split(".")[1]));
      serviceRegion.value = token.region;
      authorizationToken = this.responseText;
      subscriptionKey.disabled = true;
      subscriptionKey.value = "using authorization token (hit F5 to refresh)";
      console.log("Got an authorization token: " + token);
    };
  }
}
