# tBot

Bot de Discord para manejar materias y tareas de escuela.

## Características

* Proyecto en TypeScript.
* API de Discord.
* SQLite.
* Sequelize-Typescript (Se puede migrar del paquete actual a Sequelize v7 una vez salga de la fase Alpha).
* Registrar materias que se están cursando.
* Editar las materias.
* Borrar las materias.
* Mostrar todas las materias actuales.
* Registrar tareas a materias en específico.
* Mostrar todas las tareas de una materia en específico.
* Borrar tareas una vez hechas
* Editar tarea (Pendiente).

## Iniciar el bot

Tendras que hacer un archivo .env donde tendras que poner lo siguiente:

* DISCORD_BOT_TOKEN="replace-for-token" (Este se puede obtener haciendo una aplicación
  en [Discord Dev](https://discord.com/developers/applications))
* CLIENT_ID="replace-for-token" (Este también se encuentra donde mismo en la configuración del bot)
* GUILD_ID="replace-for-token" (Este es opcional si estás haciendo pruebas en un servidor privado, sirve para hacer
  deploys de comandos de prueba en servidores específicos y no ponerlo en producción) <br />
  Después de hacer esto, puedes ejecutar, <code>npm start</code> en el root de la carpeta
  Existe también el comando <code>npm lint</code> sirve para ver qué problemas tiene el código, si lo ejecutas lo más
  probable es que imprima ciertos errores pero estos son necesarios
  y tienen errores por ciertos motivos que desconozco. 
