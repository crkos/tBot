# tBot
Bot de Discord para manejar materias y tareas de escuela.

## Características

* Proyecto en typescript.
* API de discord.
* SQLite.
* Sequelize-Typescript (Se puede migrar del paquete actual a sequelize v7 una vez salga de la fase alpha).
* Registrar materias que se estan cursando.
* Editar las materias.
* Borrar las materias.
* Mostrar todas las materias actuales.
* Registrar tareas a materias en especifico.
* Mostrar todas las tareas de una materia en especifico.
* Borrar tareas una vez hechas (Pendiente).
* Editar tarea (Pendiente).

## Iniciar el bot
Tendras que hacer un archivo .env donde tendras que poner lo siguiente:
* DISCORD_BOT_TOKEN="replace-for-token" (Este se puede obtener haz hacer una aplicacion en [Discord Dev](https://discord.com/developers/applications))
* CLIENT_ID="replace-for-token" (Este tambien se encuentra donde mismo en la configuración del bot)
* GUILD_ID="replace-for-token" (Este es opcional si estas haciendo pruebas en un servidor privado, sirve para hacer deploys de comandos de prueba en servidores especificos y no ponerlo en producción)
Despues de hacer esto, puedes ejecutar, <code>npm start</code> en el root de la carpeta
Existe tambien el comando <code>npm lint</code> sirve para ver que problemas tiene el codigo, si lo ejecutas lo mas probable es que imprima ciertos errores pero estos son necesarios
y tienen errores por ciertos motivos que desconozco. 
