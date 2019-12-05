var dicoSymboleLatex = new Map();
var dicoExpressionLatex = new Map();
var dicoSequenceurLatex = new Map();
initDicoSymboleLatex();
initDicoExpressionLatex();
initDicoSequenceurLatex();
var eq0 = ["intégrale","index","i","=","1","à","n","stop","somme","index","i","=","1","à","n","stop","fraction","13","fois","x","puissance","8","sur","racine","7","indice","2"];
var eq1 = ["somme","index","i","=","1","à","n"];
var eq2 = ["fraction","13","fois","x","puissance","8","sur","racine","7","indice","2"];
latex(eq0);


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

    dicoSymboleLatex.set("ne", "\\ne");
    dicoSymboleLatex.set("pi", "\\pi");
    dicoSymboleLatex.set("fois", "*");
    dicoSymboleLatex.set("div", "\\div");
    dicoSymboleLatex.set("sur", "}{");
    dicoSymboleLatex.set("parenthese", "parenthese");
    dicoSymboleLatex.set("open", "(");
    dicoSymboleLatex.set("closed", ")");
    dicoSymboleLatex.set("index", "_{");
    dicoSymboleLatex.set("indice", "_");
    dicoSymboleLatex.set("puissance", "^");
    dicoSymboleLatex.set("intégrale", "\\int");
    dicoSymboleLatex.set("somme", "\\sum");
}
function initDicoExpressionLatex() {
    dicoExpressionLatex.set("racine", "\\sqrt{");
    dicoExpressionLatex.set("fraction", "\\frac{");
    dicoExpressionLatex.set("à", "}^{");
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
        var equationElem = formatEquation[i];       
        if(dicoSymboleLatex.has(equationElem)){
            latexEquation += dicoSymboleLatex.get(formatEquation[i]);
        }
        else if(dicoExpressionLatex.has(equationElem)){
            latexEquation += dicoExpressionLatex.get(formatEquation[i]);
            compteurAccoladesFin++;
        }
        else if(dicoSequenceurLatex.has(equationElem)){
            latexEquation += dicoSequenceurLatex.get(formatEquation[i]);
            compteurAccoladesFin--;
        }
        else if(equationElem.length == 1 || !isNaN(equationElem)){
            latexEquation += equationElem;
        }
        else{
            latexEquation += "N/A"
        }                
    }
    while(compteurAccoladesFin>0){
        latexEquation += "}";
        compteurAccoladesFin--;
    }
    console.log(latexEquation);
    return latexEquation;
}