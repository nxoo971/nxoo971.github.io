/* ************************************************************************** */
/*                                                                            */
/*   arena.js   (Création et modification de class (niveau: débutant))        */
/*                                                                            */
/*   By: jean-marc <jmwanc@gmail.com>                                         */
/*                                                                            */
/* ************************************************************************** */

class Avatar{
    constructor(name, weapon = "Main nues", description = "No description available", 
                pv = 200)
    {
        this.name = name;
        this.weapon = weapon;
        this.description = description;
        this.pv = pv;
    }
    attaqueDefault(target){
        if (target.hasOwnProperty('pv'))
            target.pv -= 20;
    }
    attaqueCombine(target){
        if (target.hasOwnProperty('pv'))
            target.pv -= 35;
    }
    destroy(target){
        if (target.hasOwnProperty('pv'))
            target.pv = 0;
    }
}

/* Ajout d'evenements au bloc */
function    addEvent(src, target, event){
    return ;
}

/* créer un élément enfant à .. avec la valeur .. */

function    appendNode(dst, src, text = ""){
    var node = document.createElement(src);

    node.innerText = text;
    node.innerHTML = text;
    node.value = text;
    dst.append(node);
}

function    createElemTo(htmlTagDst, HtmlTagToAdd, innerText = ""){
    console.log(innerText);
    var targetTag = document.getElementById(htmlTagDst);
    if (!targetTag){
        targetTag = document.getElementsByClassName(htmlTagDst);
        if (!targetTag)
            return;
        
        for (var elem of targetTag){
            appendNode(elem, HtmlTagToAdd, innerText);
        }
        return;
    }
    appendNode(targetTag, HtmlTagToAdd, innerText);
}

/* inscrire du texte dans la balise .. */
function    setTextToHtmlTagIdOrClassName(htmlTag, input){
    var elem = document.getElementById(htmlTag);
    if (!elem){
        elem = document.getElementsByClassName(htmlTag);
        if (!elem)
            return ;
    }

    elem.innerHTML = input;
    //myDescription.innerText = input; Interpretre mal les balises html
    elem.value = input;
}

/* Ajout d'un perso dans le select avec option */
function    addPersoToSelect(perso){
    if (perso.hasOwnProperty('name')){
        createElemTo('make-perso-select', 'option', perso.name);
    }
}

/* parmis tous les persos contenu dans arrayPerso, on les
    chargent tous dans la select avec addPersoToSelect
*/
function    loadPerso(arrayPerso){
    console.log("arrayPerso");
    console.log(arrayPerso);
    if (arrayPerso.length <= 0)
        return;
    arrayPerso.forEach(function(perso) {
        console.log("perso load: ");
        console.log(perso);
        addPersoToSelect(perso);
    })

}

function    parsePerso(parseEntries, n){
    let newAvatar = [];

    for (; n < parseEntries.length; n++)
        newAvatar.push(parseEntries[n]);
    return (newAvatar);
}

function    addPerso(allPersos){
    var perso = new Avatar("default" + Math.floor(Math.random() * (100 - 0 + 1)) + 0);

    allPersos.push(perso);
    var mySelect = document.getElementsByClassName("make-perso-select");
    if (!mySelect)
        return;

    /*for (var outer of mySelect)
        outer.outerHTML = "<select name=\"make-perso-select\" class=\"make-perso-select\">\n<option value=\"Choisir un perso\">Choisir un perso</option>\n";*/
    loadPerso(parsePerso(allPersos, allPersos.length - 1));
}

/* on récupère le perso actuel grâce à son nom et la valeur
    inscrite dans la select
*/
function    getPersoByName(value, allPersos){
    var actualPerso;
    allPersos.forEach(function(perso){
        if (value === perso.name)
            actualPerso = perso;
    });
    return (actualPerso);
}

/* On met à jour la description des persos 
    - Grâce Object.getOwnPropertyNames on récupère les noms des propriétées et
        permet aussi d'être énumérable
*/
function    setDescription(perso){
    var properties = Object.getOwnPropertyNames(perso);

    var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(perso));
    
    console.log(methods);
    var description = "Profil du perso:<br>";
    for (var i = 0; i < properties.length; i++)
        description += "> <span style=\"color:rgb(254, 125, 0); font-weight:bold; \">" + properties[i].charAt(0).toUpperCase() + 
            properties[i].slice(1) + "</span>: <b>" + perso[properties[i]] + "</b><br>";

    description += "<br>Les attaques du combattant sont:<br>";
    for (var i = 1; i < methods.length; i++)
        description += "- <span style=\"color:rgb(171, 0, 0); font-weight:bold; \">" + 
        methods[i] + "</span><br>";
    setTextToHtmlTagIdOrClassName('description_perso', description);
}


/* fonction supplémentaire car le regex cest pas mon truc xd */
function    parseEntries(entries){
    var newEntries = [];

    console.log(entries);
    entries.forEach(function(i){
        if (i !== '' && i !== ': ' && i != ':' && i != ' '){
            console.log(i);
            newEntries.push(i); 
        }
        i++;
    });
    return (newEntries);
}

/* on update le nom dans la select pour ne pas avoir de conflit
    plus tard avec avec le code js, qui, génerera rien si ce nom
        ne correspond à aucun dans parmi tous les perso
*/
function    updateSelectbox(oldName, newName){
    var mySelect = document.getElementsByClassName('make-perso-select');
    if (!mySelect)
        return;
        
    for (var select of mySelect){
        for (var option of select){
            if (option.innerText === oldName){
                option.innerHTML = newName;
                option.innerText = newName;    
                option.value = newName;
                break ;
            }
        }
    }
}

/* fonction permettant de changer les attributs des class selon
    l'utilisateur et avec la valeur fournit(obligatoire)
*/
function    changeAttribut(perso){
    var params = document.getElementById('input_attribut')
    if (!perso || !params)
        return;
    
    /* regex qui prendra pour séparateur ici
        - le simple quote
        - le pipe |
        Mais comme je connais pas trop le regex j'ai
            ajouté une fonction qui va supprimer
                les string vides ou inutiles
    */
    var entrie_user = params.value.split(/['|]/);
    var entries = parseEntries(entrie_user);
    if (entries.length % 2 !== 0)
        return ;

    for (var i = 0; i < entries.length; i += 2){
        if (perso.hasOwnProperty(entries[i])){
            if (entries[i] === 'name' || entries[i] === 'nom'){
                updateSelectbox(perso.name, entries[i + 1]);
            }
            perso[entries[i]] = entries[i + 1];
        }
    }
    return perso;
}

/* END MODIFICATION */

/* CHOOSE PERSO */

function    disableBox(box, enable){
    if (enable)
        box.setAttribute('disabled', 'disabled');
    else
        box.removeAttribute('disabled');
}

function    onChangeSelectPerso2(){
    var mySelect = document.getElementById("make-perso-select2");
    var mySelectAttaqueOptions = document.getElementById("choose-attaque-select");
    var mySelectTarget = document.getElementById("choose-target-select");

    if (mySelect && mySelectAttaqueOptions && mySelectTarget && mySelect.value !== 'Choisir un perso'){
        // update selon le perso
        updateAttaque();
        // set target selon le perso
        clearSelectBox(mySelectTarget);
        setTarget(getTarget());
    }
    disableBox(mySelectAttaqueOptions, mySelect.value === 'Choisir un perso');
    disableBox(mySelectTarget, mySelect.value === 'Choisir un perso');
}

/* CHOOSE ATTACK */

function    clearSelectBox(selectBox){
    /*console.log("selectBox.node");
    console.log(selectBox.childNodes);
    for (var i = 1; i < selectBox.children.length; i++){
        console.log(selectBox.children[i]);
        selectBox.children[i].parentNode.removeChild(selectBox.children[i]);
    }
    console.log("selectBox deleted");
    console.log(selectBox);*/
    selectBox.outerHTML = "<select for=\"" + selectBox.id + "\" id=\"" + selectBox.id + "\">\n";
}

function    updateAttaqueSelectBox(perso, selectBox){
    var methodsName = Object.getOwnPropertyNames(Object.getPrototypeOf(perso));

    if (methodsName){
        if (selectBox.length > 1){
            clearSelectBox(selectBox);
            createElemTo(selectBox.id, 'option', 'Choisir une attaque');
        }
        methodsName.forEach( (methodName) => {
            if (methodName !== 'constructor'){
                createElemTo(selectBox.id, 'option', methodName);
            }
        });
    }
}

function    updateAttaque(){
    var mySelectAttaque = document.getElementById("choose-attaque-select");
    if (!mySelectAttaque)
        return ;

    var mySelectPerso2 = document.getElementById("make-perso-select2");
    if (!mySelectPerso2)
        return ;
    
    allPersos.forEach( (perso) => {
        if (perso.name === mySelectPerso2.value){
            updateAttaqueSelectBox(perso, mySelectAttaque);
            return ;
        }
    });
}

/* END CHOOSE PERSO */

/* CHOOSE TARGET */

function    getTarget(){
    var mySelectPerso = document.getElementById('make-perso-select2');
    var mySelectTarget = document.getElementById('choose-target-select');

    var allTargets = [];
    if (mySelectPerso && mySelectTarget){
        var user = mySelectPerso.value;

        if (user != ""){
            allPersos.forEach( (perso) => {
                if (perso.name != user)
                    allTargets.push(perso.name);
            });
        }
    }
    return (allTargets);
}

function    setTarget(targetArray){
    var mySelectPerso = document.getElementById('make-perso-select2');
    var mySelectTarget = document.getElementById('choose-target-select');

    var allTargets = targetArray;
    if (mySelectPerso && mySelectTarget){
        allTargets.forEach( (target) => {
            createElemTo(mySelectTarget.id, 'option', target);
        });
    }
}

/* END CHOOSE TARGET */

/* BUTTON ATTAQUE */

function    onClickButtonAttaque(){
    var selectPerso = document.getElementById('make-perso-select2');
    var selectAttaque = document.getElementById('choose-attaque-select');
    var selectTarget = document.getElementById('choose-target-select');
    var btnAttaque = document.getElementById('btnAttaque');

    if (!selectPerso || !selectAttaque || !btnAttaque || !selectTarget ||
            selectPerso.value === 'Choisir un perso' ||
            selectAttaque.value === 'Choisir une attaque' ||
            selectTarget.value === 'Choisir une cible')
        return;
    
    var actualPerso = getPersoByName(selectPerso.value, allPersos);
    var targetPerso = getPersoByName(selectTarget.value, allPersos);
    var methodsNames = Object.getPrototypeOf(actualPerso);
    var propertyNames = Object.getOwnPropertyNames(actualPerso);
    if (!actualPerso || !targetPerso || !methodsNames || !propertyNames)
        return;
    
    var valueProperties = [];

    propertyNames.forEach( (propertyName) => {
        valueProperties.push(actualPerso[propertyName]);
    });

    for (var method of methodsNames){
        if (method.name === selectAttaque.value){
            actualPerso.method(targetPerso);
        }
    }
    console.log(targetPerso);
}

/* END ATTAQUE BUTTON */

/* Création de deux avatar qui servent d'exemple */
var avatar = new Avatar("Goku", "Kamehameha");
avatar.description = "Once upon a time";
var avatar2 = new Avatar("Végéta", "Final flash", "Le princes des saiyens", 180);

/* ajouter toutes les classes avant onload
    et y placer le nom de sa classe dans les params de allPersos définit
        dans ci dessous
*/

// on stock ici tous les perso dans allPersos
var allPersos = [avatar, avatar2]; // <-

/* ON LOAD */
window.onload = function(){

    var t_selectPerso1 = document.getElementsByClassName('make-perso-select')[0];
    var t_selectPerso2 = document.getElementById("make-perso-select2");

    var t_btnChangeAttr = document.getElementById('btnChangeAttr');
    var t_btnAddPerso = document.getElementById('btnAddPerso');
 
    var t_selectTarget = document.getElementById("choose-target-select");
    var t_selectAttaque = document.getElementById("choose-attaque-select");
    var t_btnAttaque = document.getElementById("btnAttaque");


    if (!t_selectPerso1 || !t_selectPerso2 ||
        !t_btnChangeAttr || !t_btnAddPerso ||
        !t_selectAttaque || !t_selectTarget || !t_btnAttaque)
        return ;

    
    createElemTo('make-perso-select', 'option', 'Choisir un perso');
    createElemTo(t_selectAttaque.id, 'option', 'Choisir une attaque');
    createElemTo(t_selectTarget.id, 'option', 'Choisir une cible');

    loadPerso(allPersos);

    disableBox(t_selectAttaque, t_selectPerso1.value === 'Choisir un perso');
    disableBox(t_selectTarget, t_selectAttaque.value === 'Choisir une attaque');

    /* mettre à jour la description du perso selectionné grâce
        à l'évenement onchange
    */
    t_selectPerso1.addEventListener('change', function() {
        if (t_selectPerso1.value === "Choisir un perso"){
            setTextToHtmlTagIdOrClassName("description_perso", "No description available");
            return ;
         }

        var actualPerso = getPersoByName(t_selectPerso1.value, allPersos);   
        if (actualPerso){
            setDescription(actualPerso);
        }
    });

    /* mettre à jour la selection des attaques grâce
        à l'évenement onchange
        - on lance le script une fois
    */
    t_selectPerso2.addEventListener('change', function () { onChangeSelectPerso2(); } );
    /* mettre à jour les infos de la description grâce
        à l'évenement onchange
    */
    t_btnChangeAttr.addEventListener('click', function(){
        var actualPerso = getPersoByName(t_selectPerso1.value, allPersos);
        if (actualPerso){
            changeAttribut(actualPerso);
            setDescription(actualPerso);
        }
    });

    /* ajouter un perso au clique du bouton
    */
    t_btnAddPerso.addEventListener('click', function(){
        addPerso(allPersos);
    });

    /* desactiver le bouton attaque et la select cible quand aucun perso est selectionné
        - onchange event
        - on lance le script une fois
     */
    t_selectAttaque.addEventListener('change', function() {
        //disableBox(t_selectTarget, this.value === 'Choisir une attaque');
    });

    t_btnAttaque.addEventListener('click', function () { onClickButtonAttaque() });
};

/* choose map */
function chooseArena(){
    var arena = document.getElementById("map-select");
    var div = document.getElementById("img_arene");
    if (!arena | !div)
        return;

    switch (arena.value) {
        case "Namek":
        case "Nocturne":
        case "Jungle":
        case "Ice_map":
            div.style.background = "url('./img-arene/" + arena.value.toLowerCase() + ".png') center no-repeat";
            div.style.backgroundSize = "cover";
            break;
        default:
            div.style.background = "rgba(1, 1, 1, 0.8)";
            break;
    }
}