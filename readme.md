Nota: Las capturas de la  prueba con thunder client estan por separado en un archivo .pdf
# Sistema de Seguidores y Mensajes Directos

# Sistema de Seguidores y Mensajes Directos

## 📌 Descripción del Proyecto
Este es un proyecto para una red social básica que permite a los usuarios registrarse, seguir a otros usuarios, enviar mensajes y ver los mensajes recibidos. UsandoMongoDB

## Estructura 

📁src/
config/  
    db.js 

controllers/ 
     mensajeController.js
     seguidorController.js
     usuarioController.js

models/ 
     Mensaje.js
     Seguidor.js
     Usuario.js

routes/ 
     mensajeRoutes.js
     seguidorRoutes.js
     usuarioRoutes.js
server.js       
.env            


# Ejecución del Proyecto 
se puede ejecutar de las siguientes maneras
- npm start
- npm run dev

## Entidades que se utilizo

1. **Usuario**: Representa a los usuarios de la aplicación.
2. **Seguidor**: Relación entre usuarios que permite seguir/dejar de seguir.
3. **Mensaje**: Representa un mensaje enviado/recibido entre usuarios.

# Endpoints Usados
## **Usuario+**
### Crear usuario (crear usuarios para poder interactuar)
- Metodo: POST
- Ruta: api/usuarios
- Body: {
            "nombre": "Nombre de algun usuario",
            "email": "emaildel@usua.rio"
        }
### Obtener el usuario ubicandolo por ID
- Metodo: GET
- Ruta: api/usuarios/:id

## **Seguidores**
### Seguir a un usuario:

- Método: POST
- Ruta: /api/seguidores/seguir/:id_del_usario_que_va_a_seguir
- Body: {
            "usuarioActualId": "el_ID_deñl_usuario_que_se_va_a_seguir"
        }

### Dejar de seguir a un usuario

- Método: DELETE
- Ruta: /api/seguidores/dejar-seguir/:id_del_usario_que_esta_siguiendo
- Body:
        {
             "usuarioActualId": "ID_del_usuario_que_no_se_va_a_seguir"
        }

## **Mensajes**
### Enviar un mensaje:

-Método: POST
-Ruta: /api/mensajes
-Body:
        {
        "remitenteId": "ID_del_remitente",
        "destinatarioId": "ID_del_destinatario",
        "contenido": "Contenido del mensaje",
        "archivosAdjuntos": [
            {
            "nombreArchivo": "archivo de ejemplo",
            "url": "http://un_archivo.com/archivo.txt"
            }
        ]
        }

        o si solo queremos enviar sin archivos:

        {
        "remitenteId": "ID_del_remitente",
        "destinatarioId": "ID_del_destinatario",
        "contenido": "Contenido del mensaje"
        }
### Obtener el mensaje recibido
- Método: GET
- Ruta: /api/mensajes/recibidos
- Body:  {
            "usuarioId": "ID_del_usuario_al_cual_se_le_envio_el_mensaje"
         }

# Uso de Embedding y Referencing 

## Referencing para los Seguidores
En el caso de los seguidores se utiliza referencing. 
¿Por que?

En lugar de duplicar la información del usuario en cada registro de seguidor, se almacena una referencia (el "ObjectId") al usuario que sigue y al usuario seguido. Y este se esta utilizando en el modelo **Seguidor**

const seguidorSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  seguidoId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true })

Cuando utilizamos ferencias, no es necesario almacenar toda la información del usuario en cada registro de seguidor y nos puede garantiza la consistencia de los datos ya que los cambios en el perfil del usuario (como su nombre o email) no requieren actualizar múltiples registros.

Otro tambien es que la relación entre usuarios y seguidores es de tipo "muchos a muchos" es decir "un usuario puede seguir a muchos usuarios y ser seguido por muchos usuarios". Y esto en las consultas se puede utilizar "populate" de Mongoose para obtener información detallada del usuario que en este caso (su nombre y email) cuando sea necesario

## Embedding para los Archivos Adjuntos en los Mensajes
En el caso de los archivos adjuntos en los mensajes se utiliza embedding. Lo que significa que los archivos adjuntos se almacenan directamente dentro del documento del mensaje en la colección **Mensaje**

    const mensajeSchema = new Schema({
    remitenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    destinatarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    contenido: String,
    archivosAdjuntos: [{
        nombreArchivo: String,
        url: String
    }],
    leido: { type: Boolean, default: false }
    }, { timestamps: true });

  El uso de embedding para los archivos adjuntos se utiliza por varias razones. En primer lugar los archivos adjuntos están estrechamente relacionados con el mensaje y no tienen sentido fuera de este contexto por lo que incrustarlos en el mismo documento vemos que toda la información relevante este en un solo lugar para evitar la necesidad de realizar consultas adicionales a otras colecciones MongoDB también garantiza la atomicidad a nivel de documento, asegurando que toda la información relacionada con el mensaje se almacene y actualice de manera atómicaes decir de una sola vez y completa.
# Embedding y Referencing en MongoDB

Embedding y Referencing son dos estrategias para diseñar modelos de datos en MongoDB.

## Embedding

Consiste en incluir datos relacionados dentro de un solo documento.

Puede ser útil cuando:
 + Hay relaciones "contienen" entre entidades.
 + Hay relaciones uno a muchos entre entidades.

Beneficios:
 + Mejor rendimiento para las operaciones de lectura.
 + Capacidad de recuperar datos relacionados en una sola operación de base de datos.
 + Capacidad de actualizar datos relacionados en una sola escritura atómica operación.


## Referencing

Consiste en almacenar relaciones entre datos al incluir enlaces, llamados referencias, de un documento a otro.
Puede ser útil cuando:
 + La incrustación daría como resultado la duplicación de datos.
 + Se necesitan representar relaciones complejas de muchos a muchos o grandes conjuntos de datos jerárquicos.
 + La entidad relacionada es consultada frecuentemente por sí misma.

# Definiciones
https://www.mongodb.com/docs/manual/data-modeling/concepts/embedding-vs-references/
