# Api SofiDev

Esta es una API desarrollada para consumirse en un portafolio o proyecto similar.
Es desarrollada como una contribución para el canal de YouTube [Sofi dev](https://www.notion.so/www.youtube.com/@SofiDev).
El objetivo de esta API es hasta el momento permitir las siguientes cosas:

1. Registro, Autenticación y cierre de sesión de usuarios administradores.
2. Creación, lectura, edición y eliminación de tarjetas.
3. Permitir a los usuarios visitantes llenar un formulario de contacto y enviarlo
4. Permitir ver a el usuario administrador los datos recibidos mediante el formulario de contacto.
5. Enviar a el usuario visitante un correo notificando que recibimos sus datos.
6. Enviar un correo al usuario administrador notificanto del mensaje del visitante.

# AUTH

## Singup

### POST /auth/singup

Cuerpo de la petición

```json
{
	"name": "nombre del usuario",
	"email": "Email del usuario",
	"password": "contraseña del usuario",
	"user_name": "nombre de usuario único"
}
```

### El servidor realizará las siguientes validaciones:

Email: No puede estar vacío y debe de ser un formato de email valido

Name: No puede estar vacío

Password: No puede estar vacía y debe de contener mínimo 8 caracteres

User_name: Debe de tener al menos 3 caracteres y no debe de estar registrado con anterioridad

## Login

### POST /auth/login

Cuerpo de la petición

```json
{
	"email": "Email del usuario",
	"password": "contraseña del usuario"
}
```

Si las credenciales son incorrectas se devolverá el estado http 401 (UNAUTHORIZED). Sin detalles

Si todo sale bien devolverá 204 (Not Content). Todo salió bien, no hay contenido en la respuesta.

Se agregará también una cookie con un JWT si el resultado es 204

## Logout

### GET auth/logout

La petición no tiene requisitos. Siempre devolverá 204 (No content). Y si existe una sesión la eliminará

## Información del usuario.

### GET /auth/user-info

Devolverá el código http 401 (UNAUTHORIZED) si no hay una sesión valida iniciada.

Devolverá 200 (OK) junto con la información del usuario si todo está bien,

```json
{
	"id": "ID DEL USUARIO",
	"email": "EMAIL DEL USUARIO",
	"name": "NOMBRE DEL USUARIO"
}
```

# CARDS

## Crear tarjeta

### POST /cards

Permite crear una nueva tarjeta.

Requiere autenticación, en caso de no estar autenticado devolverá el código http 401(UNAUTHORIZED)

Dado que se sube un archivo, se recomienda usar el tipo de contenido multipart/form-data.

Formato de solicitud:

| title           | Título de la tarjeta                              |
| --------------- | ------------------------------------------------- |
| description     | Descripción                                       |
| repository_link | URL del repositorio                               |
| demo_link       | URL de una demostración                           |
| thumbnail       | IMAGEN JPG, JPEG, SVG, APNG, PNG, GIF, WEBP, AVIF |

## Actualizar tarjeta

### PATCH /cards/id_de_la_tarjeta

Permite actualizar una tarjeta.

Requiere autenticación, en caso de no estar autenticado devolverá el código http 401(UNAUTHORIZED)

Dado que se sube un archivo, se recomienda usar el tipo de contenido multipart/form-data.

Formato de solicitud:

| title           | Título de la tarjeta                              |
| --------------- | ------------------------------------------------- |
| description     | Descripción                                       |
| repository_link | URL del repositorio                               |
| demo_link       | URL de una demostración                           |
| thumbnail       | IMAGEN JPG, JPEG, SVG, APNG, PNG, GIF, WEBP, AVIF |

## Obtener tarjeta

### GET /cards/ID_DE_USUARIO

Permite obtener todas las tarjetas de un usuario.

Con la solicitud de [auth/user-info](#información-del-usuario) puedes obtener tu id de usuario. Ese lo puedes incluir en la solicitud de las tarjetas para obtener todas tus tarjetas.

NO REQUIERE AUTENTICACIÓN

EJEMPLO DE RESULTADO DE LA PETICIÓN

```json
[
	{
		"_id": "id de la tarjeta",
		"thumbnail": "nombre del archivo de la imagen",
		"title": "TITULO DE LA TARJETA",
		"description": "Descripción de la tarjeta",
		"repository_link": "URL del repositorio",
		"demo_link": "URL de demostración",
		"owner": "ID del usuario que creo la tarjeta",
		"__v": 0
	},
	{
		"_id": "id de la tarjeta",
		"thumbnail": "nombre del archivo de la imagen",
		"title": "TITULO DE LA TARJETA",
		"description": "Descripción de la tarjeta",
		"repository_link": "URL del repositorio",
		"demo_link": "URL de demostración",
		"owner": "ID del usuario que creo la tarjeta",
		"__v": 0
	}
]
```

## Acceder a las imágenes de las tarjetas

Cuando se sube una imagen con la tarjeta, esta se guarda en una ubicación especial, para acceder a una imagen sigue los siguientes pasos.

1. Las tarjetas, entre otra información contienen un owner y un thumbnail. El owner, es el ID del usuario que creo dicha tarjeta y a su vez el nombre de la carpeta donde se almacena el contenido multimedia que suba.
2. thumbnail: Las tarjetas incluyen un campo thumbnail, este contiene el nombre de la imagen, el cual siempre será el \_id de la tarjeta junto con su extención.
3. Las imagenes se almacenan en la carpeta del usuario/images

**Ejemplo:**

```json
[
	{
		"_id": "2244",
		"thumbnail": "2244.png",
		"title": "TITULO DE LA TARJETA",
		"description": "Descripción de la tarjeta",
		"repository_link": "URL del repositorio",
		"demo_link": "URL de demostración",
		"owner": "10816",
		"__v": 0
	}
]
```

Siguiendo lo anterior, podemos saber que la imagen se encuentra en {owner}>images>{thumbnail}

Por lo tanto, accederíamos mediante: /10816/images/2244.png

## Eliminar tarjeta

## DELETE /cards/id_de_la_tarjeta

Requiere autenticación, en caso de no estar autenticado devolverá el código http 401(UNAUTHORIZED)

Si todo sale bien, devolverá el estado 204(No content)

El proceso de eliminado es irreversible y se eliminará tanto la imagen asociada a la tarjeta como su contenido. Esto de manera definitiva.

# CONTACT

## Enviar formulario de contacto

### POST /contact

NO REQUIERE AUTENTICACIÓN

Esta acción enviará un correo electrónico a la persona que llene el formulario, avisando de que el correo se ha recibido y también enviará un correo a el usuario administrador, dueño del sitio en donde se utilice está API

```json
{
	"name": "Nombre del visitante",
	"email": "Email del visitante",
	"message": "Mensaje del visitante",
	"subject": "Asunto del visitante",
	"user_id": "ID del usuario propietario del sitio"
}
```

<aside>
💡  EL user_id, es responsabilidad del propietario del sitio, no se debe de pedir al visitante que lo ingrese, solo se debe incluir en la solicitud de manera silenciosa.

</aside>

<aside>
💡 El visitante recibirá un correo electrónico, la dirección de la cual recibirá el correo será el nombre de usuario del propietario del sitio @sofi.igarrux.com. Por ejemplo: si tu nombre de usuario es pepito, el correo llegará desde pepito@sofi.igarrux.com

</aside>

<aside>
💡 El usuario propietario del sitio, probablemente tú que lees esto, recibirá un correo de info@sofi.igarrux.com, con los detalles del correo del usuario.
 
</aside>

### El servidor realizará las siguientes validaciones:

Email: No puede estar vacío y debe de ser un formato de email valido

Name: No puede estar vacío y debe tener mínimo 3 caracteres

Message: No puede estar vacía y debe de contener mínimo 22 caracteres

Subject: Debe de tener al menos 4 caracteres y no puede estar vacío

User_id: Debe de ser un id valido y registrado.

# Errores

Los errores del servidor se devuelven en un Array con JSON que contiene una ruta y un mensaje.

Si por ejemplo es un error de validación donde el email tiene un formato incorrecto, el path será email y el mensaje contendrá información sobre el error.

Los errores que devuelven respuesta con información van con el código 400(Bad request)

Ejemplo de error de validación de email:

```json
[
	{
		"path": "email",
		"message": "El email es invalido "
	}
]
```

# Solicitudes multipart/form-data

Una solicitud con formData se ve más o menos así:

```js
const formData = new FormData()
formData.append('thumbnail', archivo) // 'archivo' es tu archivo a subir
formData.append('email', 'user@email.com')

fetch('http://localhost:3000/upload', {
	method: 'POST',
	body: formData,
})
```

Puedes crear tambien el formData ya con los datos de un formulario y añadirle si es necesario, datos extra

```js
const form = document.querySelector('form')
const formData = new FormData(form)
formData.append('otro_campo', 'valor del campo') // Le agregas datos a los que ya tiene el formulario

fetch('http://localhost:3000/upload', {
	method: 'POST',
	body: formData,
})
```

## Importante ⚠️

Para hacer commit y contribuciones por favor haz los commits usando
[Conventionls Commits](https://www.conventionalcommits.org/en/v1.0.0/)
