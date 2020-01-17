var dicoSymboleLatex = new Map();
var dicoExpressionLatex = new Map();
var dicoSequenceurLatex = new Map();

function initDicoSymboleLatex() {
  dicoSymboleLatex.set("un", "1");
  dicoSymboleLatex.set("deux", "2");
  dicoSymboleLatex.set("trois", "3");
  dicoSymboleLatex.set("quatre", "4");
  dicoSymboleLatex.set("cinq", "5");
  dicoSymboleLatex.set("six", "6");
  dicoSymboleLatex.set("sept", "7");
  dicoSymboleLatex.set("huit", "8");
  dicoSymboleLatex.set("neuf", "9");
  dicoSymboleLatex.set("à", "a");

  dicoSymboleLatex.set("ne", "\\ne");
  dicoSymboleLatex.set("pi", "\\pi");
  dicoSymboleLatex.set("fois", "*");
  dicoSymboleLatex.set("div", "\\div");
  dicoSymboleLatex.set("sur", "}{");
  dicoSymboleLatex.set("popen", "(");
  dicoSymboleLatex.set("pclosed", ")");
  dicoSymboleLatex.set("copen", "[");
  dicoSymboleLatex.set("cclosed", "]");
  dicoSymboleLatex.set("index", "_{");
  dicoSymboleLatex.set("petit", "_");
  dicoSymboleLatex.set("puissance", "^");
  dicoSymboleLatex.set("intégrale", "\\int");
  dicoSymboleLatex.set("somme", "\\sum");
}
function initDicoExpressionLatex() {
  dicoExpressionLatex.set("racine", "\\sqrt{");
  dicoExpressionLatex.set("fraction", "\\frac{");
  dicoExpressionLatex.set("vers", "}^{");
}
function initDicoSequenceurLatex() {
  dicoSequenceurLatex.set("stop", "}");
}

//["1","plus","3","racine","2","div","pi"]
//["frac","3","plus","x","sur","racine","2"]
//["x"]
/**
 * Pour une équation formatée (tableau de string),
 * retourne l'équation écrite en LaTeX
 *
 * @param {string[]} formatEquation L'équation formatée
 * @returns {string} L'équation en Latex
 */
function latex(formatEquation) {
  var latexEquation = "";
  var compteurAccoladesFin = 0;
  for (var i = 0; i < formatEquation.length; i++) {
    //pour toute l'équation
    var equationElem = formatEquation[i];
    if (dicoSymboleLatex.has(equationElem)) {
      //si le mot est dans le dico des symboles
      latexEquation += dicoSymboleLatex.get(formatEquation[i]);
    } else if (dicoExpressionLatex.has(equationElem)) {
      //sinon si il est dans le dico des expressions (nécéssite de fermer l'accolade)
      latexEquation += dicoExpressionLatex.get(formatEquation[i]);
      compteurAccoladesFin++;
    } else if (dicoSequenceurLatex.has(equationElem)) {
      latexEquation += dicoSequenceurLatex.get(formatEquation[i]);
      compteurAccoladesFin--;
    } else if (equationElem.length == 1 || !isNaN(equationElem)) {
      latexEquation += equationElem;
    } else {
      latexEquation += "N/A";
    }
  }
  while (compteurAccoladesFin > 0) {
    latexEquation += "}";
    compteurAccoladesFin--;
  }
  console.log(`Equation LateX : ${latexEquation}`);
  return latexEquation;
}
