# 💻 PEC 4 - Programación en JavaScript para Programadores

Este repositorio contiene la solución a la **PEC 4** de la asignatura **Programación en JavaScript para Programadores** de la UOC.

El objetivo de esta práctica es dominar la manipulación del **DOM** (Document Object Model) y la gestión de **eventos** en JavaScript mediante la creación de un juego funcional de Buscaminas (*Minesweeper*).

## 🚀 Funcionalidades

El juego implementado cuenta con las siguientes características:

* **Configuración dinámica:** El usuario puede seleccionar el tamaño del tablero y el número de minas antes de empezar.
* **Validación de entradas:** Control automático del número máximo de minas permitido según el tamaño del tablero.
* **Algoritmo de inundación (Flood Fill):** Al pulsar en una casilla vacía (0), se revelan automáticamente todas las casillas adyacentes vacías de forma recursiva.
* **Estados de juego:** Detección automática de condiciones de victoria (todas las casillas seguras reveladas) y derrota (mina detonada).
* **Interfaz reactiva:** Actualización visual del tablero mediante clases CSS (`revealed`, `mine`).

## 📂 Estructura del Código

La solución se ha estructurado siguiendo el paradigma de Programación Orientada a Objetos (POO), separando la lógica de negocio de la interfaz de usuario en el archivo `src/pec4/pec4.js`:

1.  **`GameConfig`**: Gestiona el formulario de entrada, capturando el tamaño y validando las minas.
2.  **`Board`**: Se encarga de la generación de la matriz de datos, colocando las minas aleatoriamente y calculando los números de proximidad.
3.  **`GameLogic`**: Contiene las reglas del juego. Gestiona el estado de las celdas (`Set` de reveladas), comprueba condiciones de victoria y ejecuta la lógica recursiva de revelado.
4.  **`UI`**: Manipula el DOM. Renderiza el tablero, gestiona los clics en las celdas y muestra los mensajes de estado (Ganar/Perder).
5.  **`Game`**: Clase principal que orquesta la inicialización de todas las anteriores y arranca la partida.

## 🚀 Instalación y ejecución de tests

Para ejecutar el proyecto y verificar los tests, asegúrate de tener [Node.js](https://nodejs.org/) instalado.

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar los tests unitarios (Jest):**
    ```bash
    npm test
    ```
    *(Pulsa `a` para correr todos los tests).*

3.  **Ejecutar la versión web:**
    ```bash
    npm run serve
    ```
    Seleccionar la carpeta ```web``` dentro de ```src```.
