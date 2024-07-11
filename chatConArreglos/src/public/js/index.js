
document.addEventListener('DOMContentLoaded', () => {
    const socket = io()
    const mensaje = document.getElementById('texto')
    const mens =  document.getElementById('tex')
    const mensajeInput = document.getElementById('input');
    const respuestaDiv = document.getElementById('enviar');

    let user 

    Swal.fire({
        title: 'Escribir nombre',
        input: 'text',
        inputValidator: (value) => {
            return !value && 'Necesitas escribir un nombre de usuario para conectarse'
        },
        toast: true
    }).then(result=>{
        user=result.value
        socket.emit('identificarse', user)

        socket.on('entrada', (data) => {
            const mensajeInput = document.getElementById('texto')
            let result = ''
            data.forEach(element => {
                result += JSON.stringify(element) + "\n"
            })
            mensajeInput.value = result
        })
        
        socket.on('mensaje_servidor_todos', (data) => {
            const mensajeInput = document.getElementById('texto')
            let result = ''
            data.forEach(element => {
                result += `${element.id} dice: ${element.data} `+"\n"
            })
            mensajeInput.value = result
        }
        )
    
    
        respuestaDiv.addEventListener('click', () => {
            const mensaje = mensajeInput.value
            if (mensaje) {
                // Enviar mensaje al servidor
                socket.emit('message', mensaje)
                mensajeInput.value = '' // Limpiar el input
            }
        }
        )
    })


   
})

