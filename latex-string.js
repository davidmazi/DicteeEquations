var dicoLatex = new Map();
initDicoLatex();

function initDicoLatex() {
    dicoLatex.set("+", "+");
    dicoLatex.set("-", "-");

    dicoLatex.set("=", "=");

    dicoLatex.set("ne", "\\ne");

    dicoLatex.set("pi", "\\pi");

    dicoLatex.set("times", "\\times");

    dicoLatex.set("div", "\\div");

    dicoLatex.set("!", "!");

    dicoLatex.set("parenthese", "parenthese");

    dicoLatex.set("open", "open");

    dicoLatex.set("closed", "closed");

}


/**
 * Pour une équation formatée (tableau de string),
 * retourne l'équation écrite en LaTeX
 * 
 * @param {string[]} formatEquation L'équation formatée
 * @returns {string} L'équation en Latex
 */
function latex(formatEquation) {
    var latexEquation = "";
    for (var i = 0; i < formatEquation.length; i++) {
        var equationElem = formatEquation[i];
        if (isNaN(equationElem))
            equationElem = dicoLatex.get(formatEquation[i]);
        if (equationElem != undefined) {
            latexEquation += equationElem + " ";
        }
    }
    return latexEquation;
}