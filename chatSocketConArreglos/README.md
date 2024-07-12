Necesitas:

node.js v19

docker ultima version

Preparación de la aplicación:

Asegúrate de tener de clonar este directorio en tu maquina local 

Construcción de la imagen Docker:

Desde la línea de comandos, en el directorio donde se encuentra tu Dockerfile, ejecuta el siguiente comando para construir la imagen Docker:


              docker build -t nombre-de-tu-imagen .

Sustituye nombre-de-tu-imagen por el nombre que quieras darle a tu imagen Docker.

Ejecución del contenedor:

Una vez que la imagen se haya construido correctamente, puedes ejecutar un contenedor con el siguiente comando

              docker run -p 8080:8080 -d nombre-de-tu-imagen


Despues habrir en el puerto http://localhost:8080/api todos los clientes que queramos

Todo se guarda en memoria por lo que los datos se pierden a dar de baja el container
