#Mexico City Metro Challenge
El reto consiste en crear un servicio para usar el sistema de transporte metro dentro de la CDMX.

Se compone de 4 etapas sucesivas.

##Etapa 1
A partir del archivo .kml proporcionado, obtener la descripción de la todas las líneas del metro. Cada línea tiene un nombre y una lista de estaciones. Cada estación tiene un nombre y unas coordenadas geográficas (latitud y longitud).

##Etapa 2
Basándose en la etapa anterior, crear un programa que a partir de los nombres de un par de estaciones, te de instrucciones precisas para trasladarte de una estación a otra, incluyendo todos los detalles necesarios para cada segmento de la ruta en caso de que la ruta se componga de varios segmentos.

Para cada segmento debe indicar:
    -Línea a la que corresponde el segmento.
    -Estación de origen.
    -Estación destino.
    -Número de estaciones que hay que viajar.

##Etapa 3
Exponer la funcionalidad anterior como un API REST


##Etapa 4
Crear una interfaz de usuario que permita utilizar este servicio via el api REST.