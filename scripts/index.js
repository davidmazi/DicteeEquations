// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function() {
  startRecognizeOnceAsyncButton = document.getElementById(
    "startRecognizeOnceAsyncButton"
  );
  subscriptionKey = document.getElementById("subscriptionKey");
  serviceRegion = document.getElementById("serviceRegion");
  phraseDiv = document.getElementById("phraseDiv");

  startRecognizeOnceAsyncButton.addEventListener("click", function() {
    startRecognizeOnceAsyncButton.disabled = true;
    phraseDiv.innerHTML = "";

    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    var speechConfig;
    if (authorizationToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
        authorizationToken,
        serviceRegion.value
      );
    } else {
      if (
        subscriptionKey.value === "" ||
        subscriptionKey.value === "subscription"
      ) {
        alert(
          "Please enter your Microsoft Cognitive Services Speech subscription key!"
        );
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        subscriptionKey.value,
        serviceRegion.value
      );
    }

    speechConfig.speechRecognitionLanguage = "fr-FR";
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizeSpeech(recognizer);
  });

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    startRecognizeOnceAsyncButton.disabled = false;

    document.getElementById("content").style.display = "block";
    document.getElementById("warning").style.display = "none";

    // in case we have a function for getting an authorization token, call it.
    if (typeof RequestAuthorizationToken === "function") {
      RequestAuthorizationToken();
    }
  }
});

function recognizeSpeech(recognizer) {
  recognizer.recognizeOnceAsync(
    function(result) {
      startRecognizeOnceAsyncButton.disabled = false;
      result.text.toLowerCase().includes("fin")
        ? (phraseDiv.innerHTML += result.text.substring(
            0,
            result.text.indexOf("fin")
          ))
        : (phraseDiv.innerHTML += result.text + " ");

      if (!result.text.toLowerCase().includes("fin")) {
        return recognizeSpeech(recognizer);
      }

      recognizer.close();
      recognizer = undefined;
    },
    function(err) {
      startRecognizeOnceAsyncButton.disabled = false;
      phraseDiv.innerHTML += err;
      window.console.log(err);

      recognizer.close();
      recognizer = undefined;
    }
  );
}
