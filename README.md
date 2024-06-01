# Api SofiDev

Esta es una API desarrollada para consumirse en un portafolio o proyecto similar. 
Es desarrollada como una contribución para el canal de YouTube [Sofi dev](www.youtube.com/@SofiDev). 
El objetivo de esta API es hasta el momento permitir las siguientes cosas:

1. Registro, Autenticación y cierre de sesión de usuarios administradores. 
2. Creación, lectura, edición y eliminación de tarjetas.
3. Permitir a los usuarios visitantes llenar un formulario de contacto y enviarlo 
4. Permitir ver a el usuario administrador los datos recibidos mediante el formulario de contacto. 
5. Enviar a el usuario visitante un correo notificando que recibimos sus datos. 
6. Enviar un correo al usuario administrador notificanto del mensaje del visitante. 

## Rutas y uso 

### Autenticación

#### Login
*Inicio de sesión* `/auth/login`

```jsonc
{
    "email": "string", 
    "password": "string"
}
```

Respuestas
| Tipo  | Causa                       | Código             | Mensaje |
| ----- | --------------------------- | ------------------ | ------- |
| Error | Credenciáles no validas     | 401 (Unauthorized) |         |
| Ok    | Inicio de sesión conseguido | 204 (No Content)   |         |


#### Singup

*Registro de usuairo* `/auth/signup`

```jsonc
{
    "name": "string", // No puede estar vacío
    "email": "string", // Debe de ser un formato de email valido
    "password": "string" // Debe de contener minimo 8 carácteres
}
```
Respuestas
| Tipo  | Causa                        | Código            | Mensaje                                         |
| ----- | ---------------------------- | ----------------- | ----------------------------------------------- |
| Error | Cuerpo vacío                 | 400 (Bad Request) | El cuerpo de la respuesta no puede estar vacío  |
| Error | El correo ya está registrado | 409 (Conflict)    | Ese email ya está registrado.                   |
| Error | Contraseña corta             | 400 (Bad Request) | La contraseña debe de tener minimo 8 carácteres |
| Error | Formato de correo invalido   | 400 (Bad Request) | El correo no es valido                          |
| Error | Nombre vacío                 | 400 (Bad Request) | El nombre es demasiado corto                    |
| Error | Email vacío                  | 400 (bad Request) | El correo no es valido                          |
| Error | Contraseña vacía             | 400 (Bad Request) | La contraseña no puede estar vacía              |
| Ok    | Usuario registrado           | 201 (Created)     |                                                 |

**Importante ⚠️**
Los errores con código 400 se devuelven en un objeto similar a este:
```jsonc
[
    {
        "path": "password",
        "message": "La contraseña no puede estar vacía"
    },
    {
        "path": "name",
        "message": "El nombre es demasiado corto"
    }
]
```
#### logout

*Cierre de sesión* `/auth/logout`
No requiere cuerpo, no devuelve errores


## Importante ⚠️

Para hacer commit y contribuciones por favor haz los commits usando
[Conventionls Commits](https://www.conventionalcommits.org/en/v1.0.0/)
