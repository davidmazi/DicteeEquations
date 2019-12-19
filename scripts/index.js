// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;

var handlerFiredOnce = false;

document.addEventListener("DOMContentLoaded", contentLoadedHandler);

var contentLoadedHandler = function() {
  if (!handlerFiredOnce) {
    console.log("loaded");
    startRecognizeOnceAsyncButton = document.getElementById(
      "startRecognizeOnceAsyncButton"
    );
    subscriptionKey = config.apiKey;
    serviceRegion = "westus";

    initDicoOp();

    initDicoSymboleLatex();
    initDicoExpressionLatex();
    initDicoSequenceurLatex();

    startRecognizeOnceAsyncButton.addEventListener("click", function() {
      startRecognizeOnceAsyncButton.disabled = true;
      clearLatexCodeText();

      // if we got an authorization token, use the token. Otherwise use the provided subscription key
      var speechConfig;
      if (authorizationToken) {
        speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
          authorizationToken,
          serviceRegion.value
        );
      } else {
        speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
          config.apiKey,
          "westus"
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

      // in case we have a function for getting an authorization token, call it.
      if (typeof RequestAuthorizationToken === "function") {
        RequestAuthorizationToken();
      }
    }
    handlerFiredOnce = true;
  }
};

function recognizeSpeech(recognizer) {
  console.log("~~~~~Started Recording~~~~~");
  startRecognizeOnceAsyncButton.disabled = true;
  recognizer.recognizeOnceAsync(
    function(result) {
      startRecognizeOnceAsyncButton.disabled = false;
      console.log(`Resultat MS : ${result.text}`);
      result.text.toLowerCase().includes("fin")
        ? changeLatexCodeText(
            latex(format(result.text.substring(0, result.text.indexOf("fin"))))
          )
        : changeLatexCodeText(latex(format(result.text.slice(0, -1) + " ")));

      if (!result.text.toLowerCase().includes("fin")) {
        return recognizeSpeech(recognizer);
      }

      recognizer.close();
      recognizer = undefined;
    },
    function(err) {
      startRecognizeOnceAsyncButton.disabled = false;
      window.console.warn(err);

      recognizer.close();
      recognizer = undefined;
    }
  );
}

function changeLatexCodeText(textToPrint) {
  element = document.getElementById("latex-code-text");
  element.innerHTML += textToPrint;
}

function clearLatexCodeText() {
  element = document.getElementById("latex-code-text");
  element.innerHTML = "";
}
