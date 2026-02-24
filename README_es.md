# PJP PEC 4

En esta PEC se practican los diversos aspectos que ofrece el API DOM de JavaScript: búsqueda de nodos, iteración y manipulación de elementos, así como la gestión de eventos como respuesta a la interacción del usuario.

## Competencias

En esta PEC se desarrollan las siguientes competencias del Máster:

* [CB10] Que los estudiantes posean las habilidades de aprendizaje que les permitan continuar estudiando de una manera que tendrá que ser en gran medida autodirigida o autónoma.
* [CG2] Resolver problemas, identificando, analizando y definiendo sus elementos significativos.
* [CE3] Utilizar de manera adecuada los lenguajes de programación y las mejores herramientas de desarrollo para el análisis, el diseño y la implementación de lugares y aplicaciones web en función de las necesidades del proyecto.
* [CE5] Aplicar de la manera más adecuada los patrones de arquitectura de software más conveniente para cada problema.

## Objetivos

Los objetivos concretos de esta PEC son:

* Ser capaz de comprender y poner en práctica las funcionalidades de manipulación del DOM de JavaScript.
* Ser capaz de resolver problemas sobre manipulación del DOM en JavaScript.
* Saber aplicar las diferentes funciones de manipulación del DOM de JavaScript.
* Explorar y conocer maneras diferentes de resolver problemas sobre manipulación del DOM en JavaScript.

## Entrega de la PEC

Una vez hayas realizado las actividades prácticas propuestas en este enunciado, **la entrega se realizará de forma doble**:

- Deberás enviar tus cambios al apartado del aula virtual de la UOC.
- Deberás enviar tus cambios al repositorio de GitHub Classroom.

Recuerda que este repositorio lo has clonado del repositorio en GitHub. Cuando trabajes en tu sistema, todos los cambios los harás en tus ficheros locales, los cuales tendrás que añadir y _comitear_ a tu repositorio Git. Estos cambios estarán en tu sistema hasta que hagas _push_ y los envíes al repositorio en GitHub.

Recuerda que debes trabajar en la rama _main_ o _master_ (la que se cree por defecto). Puedes hacer varios envíos.

En el aula virtual encontrarás una _checklist_ que te ayudará a repasar todos los pasos que debes hacer para la entrega de tu PEC.

## Puntuación

El hecho de trabajar con tests para verificar la funcionalidad del código os permitirá tener una idea de vuestra propia nota antes de la entrega.

La puntuación de los ejercicios prácticos se basa en dos criterios: **Funcionalidad** e **Implementación**. Se espera que los ejercicios funcionen correctamente (pasen los tests) y que la implementación (el código) tenga una calidad adecuada.

Algunos detalles a tener en cuenta:

- Se penalizará cualquier intento de _hardcodear_ los tests para forzar que pasen. Esta técnica consiste en cambiar la implementación para que devuelva únicamente el valor esperado por el test (cualquier otro test fallaría).
- Los tests automáticos están diseñados para detectar ejercicios erróneos o incompletos para casos concretos. El hecho de que un test pase no garantiza que el ejercicio esté realizado correctamente, es decir, que cubra todos los casos.
- Un ejercicio cuyos tests no pasan se puntuará con un 0 salvo que existan problemas con el test.
- Además de pasar los tests, el profesorado evaluará vuestro código con base en los siguientes criterios:
  - Legibilidad, sencillez y calidad del código.
  - Conocimientos de programación. Por ejemplo, no utilizar las estructuras de control adecuadas, como utilizar un bucle para construir una sentencia condicional o viceversa.

## Requisitos mínimos

- Tener instalado Visual Studio Code.
- Conocimientos básicos de Git y GitHub (Reto 1)
- Estudio de la introducción y repaso a JavaScript (Reto 2).
- Estudio de los conceptos de JavaScript (Reto 2).
- Estudio de la introducción a la asincronía en JavaScript (Reto 3).
- Estudio de los conceptos de asincronía de JavaScript (Reto 3).
- Estudio de los materiales y ejercicio sobre manipulación del DOM (Reto 4).

### Caso práctico

En esta PEC trabajaremos con un caso práctico que pretende construir un buscaminas funcional. El objetivo es implementar las clases necesarias para gestionar la configuración, la lógica del juego, el tablero y la interfaz de usuario.

El juego se compone de un tablero de tamaño configurable, donde se colocan minas de forma aleatoria. El jugador debe descubrir las celdas sin minas y evitar las que contienen minas. Si el jugador descubre todas las celdas sin minas, gana la partida. Si descubre una mina, pierde.

Un ejemplo de cómo se verá la aplicación web una vez implementados los ejercicios de la PEC es el siguiente:

![Game Screenshot](./Buscaminas.gif)

En la carpeta `src/web` encontrarás los ficheros necesarios para el front-end. El fichero `index.html` contiene la estructura básica de la aplicación, mientras que el fichero `style.css` contiene los estilos CSS para la interfaz de usuario. El fichero `game.js` es el punto de entrada de la aplicación y se encargará de inicializar el juego.

## Ejercicios prácticos (10 pts)

Para realizar los ejercicios prácticos debes dirigirte a la siguiente ruta, dentro del repositorio: `src/pec4/pec4.js`.
En este fichero deberás implementar las funciones que te indicamos en los ejercicios que verás más abajo.
En cada función encontrarás un encabezado con la descripción de la función y los parámetros que recibe.

Por otro lado, los tests que te permitirán saber si la solución que propones para los ejercicios es correcta están en el fichero `src/pec4/pec4.test.js`.

**No debes editar este fichero**.
Ten en cuenta que los tests son condiciones que deben cumplir las funciones que implementarás en los ejercicios, por lo que pueden servirte de ayuda para corregirlos.

Para correr la aplicación deberás ejecutar el comando:
```bash
npm run serve
```
y seleccionar la carpeta `web` dentro de `src`. Cuando el juego sea funcional debería de verse ahí el tablero y la interfaz de usuario; de una manera similar a la imagen que se muestra anteriormente.

Para ejecutar los tests, recuerda que solo tienes que ejecutar el siguiente comando:
```bash
npm test
```

y pulsar la tecla correspondiente con el test que quieras ejecutar. Pulsando la `a` correrás todos los tests. Recuerda que para que un ejercicio esté correcto **a nivel funcional** debe de pasar todos los tests.

### Ejercicio 1 (1.5 pts): Configuración del juego

Implementa la clase `GameConfig` para gestionar la configuración del juego y su formulario de configuración.

Las características de la clase son las siguientes:

- Debe tener dos propiedades, `size` y `mines` de tipo numérico e inicializadas con los valores 6 y 5 respectivamente.
- Deberá tener una propiedad `sizeInput`, que representará el elemento del DOM que contendrá el tamaño del tablero. Dicho elemento es de tipo input y de nombre "size", tal y como se puede comprobar en el ficheto HTML (`src/web/index.html`).
- Deberá tener una propiedad `minesInput`, que representará el elemento del DOM que contendrá el número de minas. Dicho elemento está identificado con el id _mines_.
- Deberá implementar un método `initialize()` que añada los eventos necesarios para gestionar el formulario de configuración del juego. Este método debe:
  - Obtener los elementos del DOM correspondientes a las propiedades `sizeInput` y `minesInput`.
  - Añadir un evento de tipo `change` al elemento `sizeInput` que actualice la propiedad `size` con el valor introducido por el usuario.
  - Añadir un evento de tipo `change` al elemento `minesInput` que actualice la propiedad `mines` con el valor introducido por el usuario. Deberás controlar que el número máximo de minas sea válido, siendo el mínimo 1 mina y el máximo el total de casillas menos 1. Por ejemplo, para un juego de tamaño 6x6, el número máximo de minas será de (6*6)-1=35 minas. En caso de que se cambie el tamaño del tablero, se deberá de comprobar el número máximo de minas de nuevo. Si el número introducido es inválido (por ejemplo, mayor al máximo, o menor a 1) entonces la casilla se rellenará automáticamente con el número válido más cercano.

### Ejercicio 2 (2 pts): Generación del tablero

Implementa la clase `Board` para gestionar el tablero del juego.

Las características de la clase son las siguientes:

- El constructor deberá recibir como parámetro un objeto de tipo `gameConfig` que contendrá la configuración del juego.
- Deberá tener dos propiedades `size` y `mines` que guardarán el tamaño del tablero.
- Deberá tener una propiedad `board` que representará el tablero del juego. Esta propiedad será un array bidimensional de enteros.
- Deberá implementar un constructor que reciba como parámetro un objeto de tipo `gameConfig` que inicialice las tres propiedades: `size` y `mines` los inicializará con los valores obtenidos de `gameConfig` y el `board` con todos los valores a 0.
- Deberá implementar un método que se llame `generate()` que complete el tablero realizando las siguientes acciones: Para cada valor `board[x][y]`
  - Colocar un total de `mines` minas de forma aleatoria por el tablero, marcando la casilla con un -1, para indicar que en esa casilla hay una mina.
  - Contar el número de minas adyacentes a cada celda y guardarlo en la posición correspondiente del tablero.

### Ejercicio 3 (2.5 pts): Lógica del juego

Implementa la clase `GameLogic` para gestionar la lógica del juego.

Las características de la clase son las siguientes:

- Debe implementar un constructor que inicialice 4 atributos:
  - Un atributo `board` que será una instancia de la clase `Board`. Le será pasado como parámetro al constructor.
  - Un atributo `revealed` que será una estructura de tipo `Set()`. Las estructuras de tipo `Set()` funcionan como arrays pero no permiten elementos repetidos. Implementan funciones útiles como `has(item)` que indica si un elemento existe dentro del set, o `add(item)` que añade un elemento al set.
  - Un atributo `gameOver` que será un booleano que indicará si el juego ha terminado o no.
  - Un atributo `hasWon` que será un booleano que indicará si el jugador ha ganado o no.
- Deberá implementar un método `checkWin()` que devuelva `true` cuando el jugador haya ganado. El jugador ha ganado cuando el número de casillas por revelar es igual al número de minas configuradas.
- Deberá implementar un método `revealCell(row,col)` que _revele_ una casilla, y se comportará de la siguiente manera dependiendo del contenido de la casilla:
  - Si la casilla es una mina, se marcará el juego como terminado y revelará todas las celdas.
  - Si la casilla es un 0, significa que no hay ninguna mina a su alrededor. En este caso, se revelan todas las celdas adyacentes que no han sido reveladas.
  - Si la casilla tiene un número, se revelará únicamente esa celda y el juego continuará.
  - En cualquier caso, tras finalizar el _revelado_ se deberá comprobar si el juego ha finalizado llamando al método `checkWin()` y marcando los valores `gameOver` y `hasWon` a `true`.
  - Si la casilla revelada es una mina, retornará `true` y sino, retornará `false`.

> **Nota**: Puedes implementar tantos métodos auxiliares como necesites. Además, aunque no es obligatorio, se aconseja utilizar la recursividad par solucionar este problema pues simplifica en mucho el código resultante. Este hecho se tendrá en cuenta en la corrección.

### Ejercicio 4.1 (1.5 pts): Interfaz de usuario (1)

Implementa la clase `UI` para gestionar la interfaz de usuario.

Las características de la clase son las siguientes:

- Debe implementar un constructor que inicialice 2 atributos:
  - Un atributo `gameLogic` que será una instancia de la clase `GameLogic`. Le será pasado como parámetro al constructor.
  - Un atributo `gameBoard` que será el elemento de DOM que contiene el identificador `game-board`.
- Debe implementar el método `renderBoard()` que se encargará de renderizar el tablero en el DOM. Este método debe:
  - Limpiar el contenido del elemento `gameBoard`.
  - Añadirle al elemento `gameBoard` dos clases, la clase `game-board` y la clase `size-{size}` donde `{size}` es el tamaño del tablero, que se puede recuperar utilizando la propiedad `gameLogic.board`.
  - Crear, size+size celdas. Cada celda tendrá las siguientes características:
    - Será un elemento de DOM de tipo `div`.
    - Tendrá la clase `cell`.
    - Tendrá propiedades (dataset) `row` y `col`, siendo `row` y `col` los valores de la fila y columna respectivamente.
    - Se insertará como elemento dentro del elemento `gameBoard`.
    - Tendrá un evento `click` asociado que realizará lo siguiente:
      - Llamará al método `revealCell` de `gameLogic` pasando como parámetros la fila y columna de la celda.
      - Llamará al método `updateBoard()` para actualizar el tablero.
      - Comprobará si el elemento clicado es una mina, si lo es, llamaŕa al método `showGameStatus(bool)` con el parámetro a `true` si el jugador ha ganado y false si ha perdido.

### Ejercicio 4.2 (1 pts): Interfaz de usuario (2)

Implementa los siguientes métodos para la clase `UI`:

- El método `showGameStatus(status)`, recibe como parámetro un booleano.
  - Si el parámetro es `true`, muestra un mensaje de victoria: '¡Has ganado!'
  - Si el parámetro es `false`, muestra un mensaje de derrota: '¡Has perdido!'.
  - En ambos casos el mensaje se mostrará en el elemento `game-status` del DOM, al final y dentro de un `div` con clase `game-status`.
  - El mensaje se mostrará durante 5 segundos y después se eliminará automáticamente.

  - El método `updateBoard()` que actualizará el tablero de juego, realizando las siguientes acciones:
    - Para cada celda del tablero, se comprobará si la celda ha sido revelada o no.
      - Si la celda ha sido revelada se le añadirá la clase `revealed` y además:
        - Si contiene una mina se le añadirá la clase `mine` y se mostrará un emoticon de una mina (💣). El valor (`value`) de la casilla se marcará debidamente con `-1`.
        - Si no contiene una mina, el valor almacenado y se mostrará (mostrando vacío si el valor es 0).

### Ejercicio 5 (1.5 pts): Integración del juego

Implementa la clase `Game` para integrar todos los componentes del juego.

Esta clase tendrá las siguientes características:
  - Deberá implementar un constructor con las propiedades siguientes inicializadas a `null`:
    - `config`.
    - `board`.
    - `gameLogic`.
    - `ui`.

  - Deberá implementar un método `start()` que inicie el juego y que realizará lo siguiente:
    - Instanciará la clase `GameConfig` y llamará al método `initialize()`.
    - Creará un elemento de DOM de tipo `button` con identificador `generate` y texto `Generar Juego` que lo colacará al final del `div` con clase `config`, dentro del formulario de configuracion.
    - Además, a ese butón le añadirá el listener `click` que hará lo siguiente:
      - Instanciará la clase `Board` y llamará al método `generate()`.
      - Instanciará la clase `GameLogic` y le pasará como parámetro el objeto `board`.
      - Instanciará la clase `UI` y le pasará como parámetro el objeto `gameLogic`.
      - Llamará al método `renderBoard()` de la clase `UI` para renderizar el tablero.

### Ejecución del juego

Una vez todos los ejercicios queden resueltos, el juego será funcional y podrás jugar partidas del buscaminas, configurando cada vez el tamaño del tablero y el número de minas.