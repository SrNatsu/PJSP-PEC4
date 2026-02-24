# PJP PAC 4

En aquesta PAC es practiquen els diversos aspectes que ofereix l'API DOM de JavaScript: cerca de nodes, iteració i manipulació d'elements, així com la gestió d'esdeveniments com a resposta a la interacció de l'usuari.

## Competències

En aquesta PAC es desenvolupen les següents competències del Màster:

* [CB10] Que els estudiants tinguin les habilitats d'aprenentatge que els permetin continuar estudiant d'una manera que haurà de ser en gran mesura autodirigida o autònoma.
* [CG2] Resoldre problemes, identificant, analitzant i definint-ne els elements significatius.
* [CE3] Utilitzar de manera adequada els llenguatges de programació i les millors eines de desenvolupament per a l'anàlisi, el disseny i la implementació de llocs i aplicacions web en funció de les necessitats del projecte.
* [CE5] Aplicar de la manera més adequada els patrons d'arquitectura de programari més convenient per a cada problema.

## Objectius

Els objectius concrets d'aquesta PAC són:

* Ser capaç de comprendre i posar en pràctica les funcionalitats de manipulació del DOM de JavaScript.
* Ser capaç de resoldre problemes sobre manipulació del DOM a JavaScript.
* Saber aplicar les diferents funcions de manipulació del DOM de JavaScript.
* Explorar i conèixer maneres diferents de resoldre problemes sobre manipulació del DOM en JavaScript.

## Lliurament de la PAC

Un cop hagis realitzat les activitats pràctiques proposades en aquest enunciat, **el lliurament es realitzarà de forma doble**:

- Hauràs d'enviar els teus canvis a l'apartat de l'aula virtual de la UOC.
- Hauràs d'enviar els teus canvis al dipòsit de GitHub Classroom.

Recorda que aquest repositori l'has clonat del repositori a GitHub. Quan treballis al teu sistema, tots els canvis els faràs als teus fitxers locals, els quals hauràs d'afegir i _comitejar_ al teu repositori Git. Aquests canvis estaran al teu sistema fins que facis _push_ i els enviïs al repositori a GitHub.

Recorda que has de treballar a la branca _main_ o _master_ (la que es creu per defecte). Pots fer diversos enviaments.

A l'aula virtual trobaràs una _checklist_ que t'ajudarà a repassar tots els passos que has de fer per al lliurament de la teva PAC.

## Puntuació

El fet de treballar amb tests per verificar la funcionalitat del codi us permetrà tenir una idea de la vostra pròpia nota abans del lliurament.

La puntuació dels exercicis pràctics es basa en dos criteris: **Funcionalitat** i **Implementació**. S'espera que els exercicis funcionin correctament (passin els tests) i que la implementació (el codi) tingui una qualitat adequada.

Alguns detalls a tenir en compte:

- Es penalitzarà qualsevol intent de _hardcodejar_ els tests per forçar que passin. Aquesta tècnica consisteix a canviar la implementació perquè torni únicament el valor esperat pel test (qualsevol altre test fallaria).
- Els tests automàtics estan dissenyats per detectar exercicis erronis o incomplets per a casos concrets. El fet que un test passi no garanteix que lexercici estigui realitzat correctament, és a dir, que cobreixi tots els casos.
- Un exercici els tests del qual no passen es puntuarà amb un 0 llevat que hi hagi problemes amb el test.
- A més de passar els tests, el professorat avaluarà el vostre codi amb base en els criteris següents:
- Llegibilitat, senzillesa i qualitat del codi.
- Coneixements de programació. Per exemple, no utilitzar les estructures de control adequades, com ara utilitzar un bucle per construir una sentència condicional o viceversa.

## Requisits mínims

- Tenir instal·lat Visual Studio Code.
- Coneixements bàsics de Git i GitHub (Repte 1)
- Estudi de la introducció i repàs a JavaScript (Repte 2).
- Estudi dels conceptes de JavaScript (Repte 2).
- Estudi de la introducció a l'assincronia en JavaScript (Repte 3).
- Estudi dels conceptes d'assincronia de JavaScript (Repte 3).
- Estudi dels materials i exercici sobre manipulació del DOM (Repte 4).

### Cas pràctic

En aquesta PAC treballarem amb un cas pràctic que pretén construir un cercamines funcional. L'objectiu és implementar les classes necessàries per gestionar la configuració, la lògica del joc, el tauler i la interfície d'usuari.

El joc es compon d'un tauler de mida configurable on es col·loquen mines de forma aleatòria. El jugador ha de descobrir les cel·les sense mines i evitar les que contenen mines. Si el jugador descobreix totes les cel·les sense mines, guanya la partida. Si descobreix una mina, perd.

Un exemple de com es veurà l'aplicació web una vegada implementats els exercicis de la PAC és el següent:

![Game Screenshot](./Buscaminas.gif)

A la carpeta `src/web` trobaràs els fitxers necessaris per al front-end. El fitxer `index.html` conté l'estructura bàsica de l'aplicació, mentre que el fitxer `style.css` conté els estils CSS per a la interfície d'usuari. El fitxer `game.js` és el punt dʻentrada de l'aplicació i s'encarregarà d'inicialitzar el joc.

## Exercicis pràctics (10 pts)

Per realitzar els exercicis pràctics t'has de dirigir a la ruta següent, dins del repositori: `src/pec4/pec4.js`.
En aquest fitxer hauràs d'implementar les funcions que t'indiquem als exercicis que veuràs més avall.
A cada funció trobaràs una capçalera amb la descripció de la funció i els paràmetres que rep.

D'altra banda, els tests que et permetran saber si la solució que proposes per als exercicis és correcta són al fitxer `src/pec4/pec4.test.js`.

**No has d'editar aquest fitxer**.
Tingues en compte que els tests són condicions que han de complir les funcions que implementaràs en els exercicis, per la qual cosa et poden servir d'ajuda per corregir-los.

Per córrer l'aplicació hauràs d'executar l'ordre:
```bash
npm run serve
```
i seleccionar la carpeta `web` dins de `src`. Quan el joc sigui funcional s'hi hauria de veure el tauler i la interfície d'usuari; d'una manera semblant a la imatge que es mostra anteriorment.

Per executar els tests, recorda que només has d'executar la següent ordre:
```bash
npm test
```

i prémer la tecla corresponent amb el test que vulguis executar. Prement la `a` correràs tots els tests. Recordeu que perquè un exercici estigui correcte **a nivell funcional** ha de passar tots els tests.

### Exercici 1 (1.5 pts): Configuració del joc

Implementa la classe `GameConfig` per gestionar la configuració del joc i el formulari de configuració.

Les característiques de la classe són les següents:

- Ha de tenir dues propietats, `size` i `mines` de tipus numèric i inicialitzades amb els valors 6 i 5 respectivament.
- Haurà de tenir una propietat `sizeInput`, que representarà l'element del DOM que contindrà la mida del tauler. Aquest element és de tipus input i de nom "size", tal com es pot comprovar al fitxer HTML (`src/web/index.html`).
- Haurà de tenir una propietat `minesInput`, que representarà l'element del DOM que contindrà el nombre de mines. Aquest element està identificat amb l'id _mines_.
- Haurà d'implementar un mètode `initialize()` que afegeixi els esdeveniments necessaris per gestionar el formulari de configuració del joc. Aquest mètode ha:
  - D'obtenir els elements del DOM corresponents a les propietats `sizeInput` i `minesInput`.
  - D'afegir un esdeveniment de tipus `change` a l'element `sizeInput` que actualitzi la propietat `size` amb el valor introduït per l'usuari. 
  - D'afegir un esdeveniment de tipus `change` a l'element `minesInput` que actualitzi la propietat `mines` amb el valor introduït per l'usuari. Hauràs de controlar que el nombre màxim de mines sigui vàlid, sent el mínim 1 mina i el màxim el total de caselles menys 1. Per exemple, per a un joc de mida 6x6, el nombre màxim de mines serà de (6*6)-1=35 mines. En cas que es canviï la mida del tauler, caldrà comprovar el nombre màxim de mines de nou. Si el número introduït és invàlid (per exemple, major al màxim, o menor a 1) llavors la casella s'emplenarà automàticament amb el número vàlid més proper.

### Exercici 2 (2 pts): Generació del tauler

Implementa la classe `Board` per gestionar el tauler del joc.

Les característiques de la classe són les següents:

- El constructor haurà de rebre com a paràmetre un objecte de tipus `gameConfig` que contindrà la configuració del joc.
- Haurà de tenir dues propietats `size` i `mines` que guardaran la mida del tauler.
- Haurà de tenir una propietat `board` que representarà el tauler del joc. Aquesta propietat serà un array bidimensional de sencers.
- Haurà d'implementar un constructor que rebi com a paràmetre un objecte de tipus `gameConfig` que inicialitzi les tres propietats: `size` i `mines` els inicialitzarà amb els valors obtinguts de `gameConfig` i el `board` amb tots els valors a 0.
- Haurà d'implementar un mètode que s'anomeni `generate()` que completi el tauler realitzant les accions següents: Per a cada valor `board[x][y]`
  - Col·locar un total de `mines` mines de forma aleatòria pel tauler, marcant la casella amb un -1, per indicar que en aquesta casella hi ha una mina.
  - Comptar el nombre de mines adjacents a cada cel·la i guardar-lo a la posició corresponent del tauler.

### Exercici 3 (2.5 pts): Lògica del joc

Implementa la classe `GameLogic` per gestionar la lògica del joc.

Les característiques de la classe són les següents:

- Ha d'implementar un constructor que inicialitzi 4 atributs: 
  - Un atribut `board` que serà una instància de la classe `Board`. Li serà passat com a paràmetre al constructor.
  - Un atribut `revealed` que serà una estructura de tipus `Set()`. Les estructures de tipus `Set()` funcionen com a arrays però no permeten elements repetits. Implementen funcions útils com `has(item)` que indica si un element existeix dins del set, o `add(item)` que afegeix un element al set.
  - Un atribut `gameOver` que serà un booleà que indicarà si el joc s'ha acabat o no.
  - Un atribut `hasWon` que serà un booleà que indicarà si el jugador ha guanyat o no.
- Haurà d'implementar un mètode `checkWin()` que retorni `true` quan el jugador hagi guanyat. El jugador ha guanyat quan el nombre de caselles per revelar és igual al nombre de mines configurades.
- Haurà d'implementar un mètode `revealCell(row,col)` que _reveli_ una casella, i es comportarà de la següent manera depenent del contingut de la casella:
  - Si la casella és una mina, es marcarà el joc com a acabat i revelarà totes les cel·les.
  - Si la casella és un 0, vol dir que no hi ha cap mina al seu voltant. En aquest cas, es revelen totes les cel·les adjacents que no han estat revelades.
  - Si la casella té un número, es revelarà únicament aquesta cel·la i el joc continuarà.
  - En qualsevol cas, després de finalitzar el _revelat_ s'haurà de comprovar si el joc ha finalitzat trucant al mètode `checkWin()` i marcant els valors `gameOver` i `hasWon` a `true`.
  - Si la casella revelada és una mina, retornarà `true` i si no, retornarà `false`.

> **Nota**: Pots implementar tants mètodes auxiliars com necessitis. A més, encara que no és obligatori, s'aconsella utilitzar la recursivitat per solucionar aquest problema ja que simplifica molt el codi resultant. Aquest fet es tindrà en compte en la correcció.

### Exercici 4.1 (1.5 pts): Interfície d'usuari (1)

Implementa la classe `UI` per gestionar la interfície d'usuari.

Les característiques de la classe són les següents:

- Ha d'implementar un constructor que inicialitzi 2 atributs:
  - Un atribut `gameLogic` que serà una instància de la classe `GameLogic`. Li serà passat com a paràmetre al constructor.
  - Un atribut `gameBoard` que serà lʻelement de DOM que conté lʻidentificador `game-board`.
- Ha d'implementar el mètode `renderBoard()` que s'encarregarà de renderitzar el tauler al DOM. Aquest mètode ha de:
  - Netejar el contingut de lʻelement `gameBoard`.
  - Afegir a l'element `gameBoard` dues classes, la classe `game-board` i la classe `size-{size}` on `{size}` és la mida del tauler, que es pot recuperar utilitzant la propietat `gameLogic.board`.
  - Crear, size+size cel·les. Cada cel·la tindrà les següents característiques:
    - Serà un element de DOM de tipus `div`.
    - Tindrà la classe `cell`.
    - Tindrà propietats (dataset) `row` i `col`, sent `row` i `col` els valors de la fila i columna respectivament.
    - S'inserirà com a element dins de l'element `gameBoard`.
    - Tindrà un esdeveniment `click` associat que realitzarà el següent:
      - Cridarà al mètode `revealCell` de `gameLogic` passant com a paràmetres la fila i columna de la cel·la.
      - Cridarà al mètode `updateBoard()` per actualitzar el tauler. 
      - Comprovarà si l'element clicat és una mina, si ho és, trucarà al mètode `showGameStatus(bool)` amb el paràmetre a `true` si el jugador ha guanyat i false si ha perdut.

### Exercici 4.2 (1 pts): Interfície d'usuari (2)

Implementa els mètodes següents per a la classe `UI`:

- El mètode `showGameStatus(status)` rep com a paràmetre un booleà.
  - Si el paràmetre és `true`, mostra un missatge de victòria: '¡Has ganado!'
  - Si el paràmetre és `false`, mostra un missatge de derrota: '¡Has perdido!'.
  - En ambdós casos el missatge es mostrarà a l'element `game-status` del DOM, al final i dins un `div` amb classe `game-status`.
  - El missatge es mostrarà durant 5 segons i després s'eliminarà automàticament.

  - El mètode `updateBoard()` que actualitzarà el tauler de joc, realitzant les següents accions:
    - Per a cada cel·la del tauler, es comprovarà si la cel·la ha estat revelada o no.
      - Si la cel·la ha estat revelada se li afegirà la classe `revealed` i, a més:
        - Si conté una mina se li afegirà la classe `mine` i es mostrarà una emoticona d'una mina (💣). El valor (`value`) de la casella es marcarà degudament amb `-1`.
        - Si no conté una mina, el valor emmagatzemat i es mostrarà (mostrant buit si el valor és 0).

### Exercici 5 (1.5 pts): Integració del joc

Implementa la classe `Game` per integrar tots els components del joc.

Aquesta classe tindrà les següents característiques: 
  - Haureu d'implementar un constructor amb les propietats següents inicialitzades a `null`:
    - `config`.
    - `board`.
    - `gameLogic`.
    - `ui`.

  - Haurà d'implementar un mètode `start()` que iniciï el joc i que realitzarà el següent:
    - Instanciarà la classe `GameConfig` i trucarà al mètode `initialize()`.
    - Crearà un element de DOM de tipus `button` amb identificador `generate` i text `Generar Joc` que el col·lacarà al final del `div` amb classe `config`, dins del formulari de configuració.
    - A més, a aquest botó li afegirà el listener `click` que farà el següent:
      - Instanciarà la classe `Board` i trucarà al mètode `generate()`.
      - Instanciarà la classe `GameLogic` i li passarà com a paràmetre l'objecte `board`.
      - Instanciarà la classe `UI` i li passarà com a paràmetre l'objecte `gameLogic`.
      - Trucarà al mètode `renderBoard()` de la classe `UI` per renderitzar el tauler.

### Execució del joc

Un cop tots els exercicis quedin resolts, el joc serà funcional i podràs jugar partides del buscamines, configurant cada cop la mida del tauler i el nombre de mines.