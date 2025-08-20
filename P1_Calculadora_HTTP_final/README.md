<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">

<br/><br/><br/>

# Práctica 1 - Calculadora HTTP

Versión: 25 de Enero de 2023

## Objetivos

* Comprender el funcionamiento de las peticiones y las respuestas en HTTP
* Elaborar peticiones HTTP de manera manual
* Utilizar herramientas conocidas (p.e., netcat) para depurar peticiones HTTP.

## Descripción de la práctica

En la URL http://malamen.dit.upm.es/calc hay desplegada una calculadora HTTP que sirve para sumar, restar, dividir y multiplicar dos números, obteniendo el resultado en formato JSON.

Para usar esta calculadora debe enviarse una petición HTTP de tipo POST a la URL anterior, y pasar en el cuerpo (body) los dos números y el operador que se quieran aplicar.

Hay muchas formas de realizar esa consulta: desde utilizar código Javascript en cliente, hasta el uso de herramientas específicas como cURL.
Sin embargo, todas ellas usan el protocolo HTTP por debajo.

En esta práctica, elaboraremos varias peticiones HTTP de manera manual que enviaremos al servidor, y comprobaremos que la respuesta obtenida es la esperada.


## Descargar el código del proyecto

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#descargar-el-c%C3%B3digo-del-proyecto).

## Tareas

Todas las tareas en esta práctica consistirán en escribir en texto plano una petición de tipo POST al servidor de calculadora.

El cuerpo de la petición debe user el mismo formato que un formulario.
El tipo de contenido debe ser `Content-type: application/x-www-form-urlencoded`, los operandos deben asignarse a las variables n1 y n2, el operador a la variable op, todo separado con "&", y usando escapado URL.

Así, para suma 3 y 4, hay que pasar en el body la siguiente cadena: `n1=3&n2=4&op=%2B`.

Algunos operadores han de ser escapados (transformados para su uso en URL).
Para escapar el operador suma debe usarse la codificación %2B, y para la multiplicación %2A.

La petición HTTP debe incluir también otras cabeceras, como por ejemplo:

Host: direccion del servidor
Accept: text/html,text/text,application/json
Connection: keep-alive para no cerrar la conexión
Content-Length: tamaño del body

La respuesta HTTP que devuelve el servidor es un objeto JSON que puede contener el resultado pedido, o un error si hay algún problema.

Se pide escribir varios ficheros con peticiones al servidor, siguiendo las especificaciones de los apartados siguientes.

### 1. Petición inválida

La primera tarea será escribir en el fichero `error400.txt` una petición que cause que el servidor devuelva una respuesta con un código HTTP 400. 
En otras palabras, debe ser una petición errónea.


### 2. Suma de dos valores

Escribir en el fichero `suma.txt` una petición a la calculadora de la suma de dos valores: `3` y `4`.

### 3. Petición incompleta


Por último, escriba una petición en el fichero `incompleta.txt` que cause que el servidor "quede a la espera de más datos", causando un timeout después de un tiempo.
Es decir, la petición debe ser correcta, pero incompleta.

Pista: ¿cómo sabe el servidor cuándo ha terminado una petición?.


### Comprobar las peticiones

Antes de probar el autocorector, será necesario comprobar manualmente cada una de las peticiones.
La forma de hacerlo dependerá del sistema operativo usado.

#### En *nix (GNU/Linux, Mac, BSD)

(También válido en la bash shell de Windows o en WSL (Windows Subsystem for Linux))

Lanzar el siguiente comando:

```shell
nc malamen.dit.upm.es 80 < peticion.txt
```

Este comando escribirá en pantalla la respuesta HTTP recibida, y en su body debe llegar un objeto JSON indicando el resultado.


#### En Windows
- Opción 1, **telnet** (recomendada): es necesario [activar telnet en windows](https://www.technipages.com/windows-10-enable-telnet).

    Lanzar el siguiente comando en el PowerShell:

    ```shell
    telnet malamen.dit.upm.es 80
    # pegar el contenido del fichero con la petición (no muestra el contenido que se pega en el PowerShell pero sí que lo está enviando)
    # si desea cerrar la conexión poner la palabra 'quit' 
    ```

- Opción 2, **netcat** (avanzada): durante la instalación de Node marcar la casilla `Automatically install the necesarry tools. Note that his will also install Chocolatey...`

    Abrir un PowerShell con permisos de administrador e instalar netcat con el siguiente comando:

    ```shell
    choco install netcat
    ```

    Lanzar el siguiente comando en el PowerShell:

    ```shell
    Get-Content peticion.txt | nc malamen.dit.upm.es 80
    ```


## Pruebas con el autocorector

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-con-el-autocorector).

## Pruebas manuales y capturas de pantalla

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-manuales-y-capturas-de-pantalla).

Capturas a entregar con esta práctica: 

- Captura 1: Captura de la respuesta a la petición errónea.
<kbd>
<img src="https://user-images.githubusercontent.com/47325335/215512403-056b2342-95fd-4f43-b3a0-890107359c5d.png" alt="drawing" width="400"/>
</kbd>


- Captura 2: Captura de la respuesta a la petición correcta con la suma de dos valores.
<kbd>
<img src="https://user-images.githubusercontent.com/47325335/215512506-3fd9603e-8d95-4e26-9f19-acbc5ec838f1.png" alt="drawing" width="400"/>
</kbd>


## Instrucciones para la Entrega y Evaluación.
Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#instrucciones-para-la-entrega-y-evaluaci%C3%B3n
).

## Rúbrica

Se puntuará el ejercicio a corregir sumando el % indicado a la nota total si la parte indicada es correcta:

- **40%:** Petición errónea 
- **40%:** Petición de una suma
- **20%:** Petición incompleta

Si pasa todos los tests se dará la máxima puntuación.
