var dicoOp = new Map();

/**
 * Initialise le dictionnaire des opérations possibles
 */
function initDicoOp() {
  // ----------------Symboles----------------
  dicoOp.set("un", "1");
  dicoOp.set("deux", "2");

  dicoOp.set("plus", "+");
  dicoOp.set("moins", "-");

  dicoOp.set("égal", "=");
  dicoOp.set("égals", "=");
  dicoOp.set("égale", "=");
  dicoOp.set("égales", "=");
  dicoOp.set("égalent", "=");

  dicoOp.set("factoriel", "!");
  dicoOp.set("factoriels", "!");
  dicoOp.set("factorielle", "!");
  dicoOp.set("factorielles", "!");

  dicoOp.set("différent", "ne");
  dicoOp.set("inégal", "ne");
  dicoOp.set("inégals", "ne");
  dicoOp.set("inégale", "ne");
  dicoOp.set("inégales", "ne");
  dicoOp.set("inégalent", "ne");

  dicoOp.set("pi", "pi");

  dicoOp.set("multiplié", "fois");
  dicoOp.set("multipliés", "fois");
  dicoOp.set("multipliée", "fois");
  dicoOp.set("multipliées", "fois");
  dicoOp.set("multiplie", "fois");
  dicoOp.set("multiplies", "fois");
  dicoOp.set("multiplient", "fois");

  dicoOp.set("divisé", "div");
  dicoOp.set("divisés", "div");
  dicoOp.set("divisée", "div");
  dicoOp.set("divisées", "div");
  dicoOp.set("divise", "div");
  dicoOp.set("divises", "div");
  dicoOp.set("divisent", "div");

  dicoOp.set("sur", "sur");
  dicoOp.set("sûr", "sur");
  dicoOp.set("sûrs", "sur");
  dicoOp.set("sûre", "sur");
  dicoOp.set("sûres", "sur");

  dicoOp.set("parenthèse", "parenthese");
  dicoOp.set("parenthèses", "parenthese");
  dicoOp.set("crochet", "crochet");

  dicoOp.set("ouvert", "open");
  dicoOp.set("ouverts", "open");
  dicoOp.set("ouverte", "open");
  dicoOp.set("ouvertes", "open");
  dicoOp.set("ouvrant", "open");
  dicoOp.set("ouvrante", "open");
  dicoOp.set("ouvrantes", "open");

  dicoOp.set("fermé", "closed");
  dicoOp.set("fermés", "closed");
  dicoOp.set("fermée", "closed");
  dicoOp.set("fermées", "closed");
  dicoOp.set("fermant", "closed");
  dicoOp.set("fermante", "closed");
  dicoOp.set("fermantes", "closed");

  dicoOp.set("index", "index");
  dicoOp.set("indexe", "index");
  dicoOp.set("indexes", "index");
  dicoOp.set("indexent", "index");
  dicoOp.set("indexé", "index");
  dicoOp.set("indexés", "index");
  dicoOp.set("indexée", "index");
  dicoOp.set("indexées", "index");

  dicoOp.set("indice", "indice");
  dicoOp.set("indices", "indice");

  dicoOp.set("puissance", "puissance");
  dicoOp.set("puissances", "puissance");

  dicoOp.set("intégral", "intégrale");
  dicoOp.set("intégrals", "intégrale");
  dicoOp.set("intégrale", "intégrale");
  dicoOp.set("intégrales", "intégrale");

  dicoOp.set("somme", "somme");
  dicoOp.set("sommes", "somme");

  // ----------------Expressions----------------
  dicoOp.set("racine", "racine");
  dicoOp.set("racines", "racine");

  dicoOp.set("fraction", "fraction");
  dicoOp.set("fractions", "fraction");
  dicoOp.set("fractionne", "fraction");
  dicoOp.set("fractionnes", "fraction");
  dicoOp.set("fractionnent", "fraction");
  dicoOp.set("fractionné", "fraction");
  dicoOp.set("fractionnés", "fraction");
  dicoOp.set("fractionnée", "fraction");
  dicoOp.set("fractionnées", "fraction");

  dicoOp.set("à", "à");
  dicoOp.set("a", "à");

  // ----------------Séquenceurs----------------
  dicoOp.set("stop", "stop");
  dicoOp.set("stopper", "stop");
  dicoOp.set("stoppe", "stop");
  dicoOp.set("stoppes", "stop");
  dicoOp.set("stoppent", "stop");
  dicoOp.set("stoppé", "stop");
  dicoOp.set("stoppés", "stop");
  dicoOp.set("stoppée", "stop");
  dicoOp.set("stoppées", "stop");
}

/**
 * Pour une équation transcrite (oral à écrit),
 * formate le string en fonction des opérateurs contenus dans le dictionnaire
 * et renvoie une équation formatée (tableau de string)
 *
 * @param {string} rawEquation L'équation à formater
 * @returns {string[]} L'équation formatée
 */
function format(rawEquation) {
  var rawEquationTab = rawEquation.toLowerCase().split(" ");
  var formatEquation = [];
  var parentheseOrCrochet = "";
  for (var i = 0; i < rawEquationTab.length; i++) {
    var equationElem = rawEquationTab[i];
    if (isNaN(equationElem)) {
      if (dicoOp.get(rawEquationTab[i]) == "parenthese")
        parentheseOrCrochet = "p";
      else if (dicoOp.get(rawEquationTab[i]) == "crochet")
        parentheseOrCrochet = "c";
      else {
        if (
          parentheseOrCrochet.length != 0 &&
          (dicoOp.get(rawEquationTab[i]) == "open" ||
            dicoOp.get(rawEquationTab[i]) == "closed")
        ) {
          equationElem = parentheseOrCrochet + dicoOp.get(rawEquationTab[i]);
        } else {
          equationElem = dicoOp.get(rawEquationTab[i]);
        }
        parentheseOrCrochet = "";
      }
    }

    if (equationElem != undefined) {
      formatEquation.push(equationElem);
    }
  }
  console.log(`Format Equation : ${formatEquation}`);
  return formatEquation;
}
