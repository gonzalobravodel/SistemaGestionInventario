const httpErrorMessages = {
    100: 'Continuar',
    101: 'Cambiando protocolos',
    102: 'Procesando',
    103: 'Pausado para entrada',
    200: 'OK',
    201: 'Creado',
    202: 'Aceptado',
    203: 'Información no autorizada',
    204: 'Sin contenido',
    205: 'Restablecer contenido',
    206: 'Contenido parcial',
    207: 'Multiestado',
    208: 'Informe ya registrado',
    226: 'IM usado',
    300: 'Múltiples opciones',
    301: 'Movido permanentemente',
    302: 'Encontrado',
    303: 'Ver otro',
    304: 'No modificado',
    305: 'Usar proxy',
    306: 'Cambiar proxy',
    307: 'Redirección temporal',
    308: 'Redirección permanente',
    400: 'Solicitud incorrecta',
    401: 'No autorizado',
    402: 'Pago requerido',
    403: 'Acceso prohibido',
    404: 'No encontrado',
    405: 'Método no permitido',
    406: 'No aceptable',
    407: 'Autenticación de proxy requerida',
    408: 'Solicitud expirada',
    409: 'Conflicto',
    410: 'Gone',
    411: 'Longitud requerida',
    412: 'Fallo en la precondición',
    413: 'Solicitud de entidad demasiado grande',
    414: 'URI demasiado largo',
    415: 'Tipo de medio no soportado',
    416: 'Rango solicitado no válido',
    417: 'Falló la expectativa',
    418: 'Soy una tetera',
    421: 'Fallo en la conexión requerida',
    422: 'Fallo en la validación',
    423: 'Cerrado temporalmente',
    424: 'Falló la dependencia',
    425: 'Demasiadas solicitudes',
    426: 'Actualización requerida',
    428: 'Fallo en la condición previa',
    429: 'Demasiadas solicitudes',
    431: 'Solicitudes de campos de encabezado demasiado largas',
    451: 'Inaccesible por razones legales',
    500: 'Error interno del servidor',
    501: 'No implementado',
    502: 'Bad Gateway',
    503: 'Servicio no disponible',
    504: 'Tiempo de espera de puerta de enlace agotado',
    505: 'Versión HTTP no soportada',
    506: 'Variant also negotiates',
    507: 'Almacenamiento insuficiente',
    508: 'Bucle detectado',
    510: 'Extensión no extendida',
    511: 'Requiere autenticación de red',
    // Puedes agregar más códigos y mensajes según tus necesidades
};


const handleHttpError = (res, codeInput) => {
    // Asegurarse de que codeInput sea un valor numérico válido
    if (!isNaN(codeInput)) {
        const code = parseInt(codeInput, 10); // Asegurarse de que el código sea un número entero

        const errorMessage = httpErrorMessages[code] || 'Error desconocido';

        res.status(code);
        res.json({ error: true, message: errorMessage });
    } else {
        // Si codeInput no es un número válido, puedes manejarlo de la forma que desees.
        res.status(500); // Código de estado HTTP 500 para error interno del servidor
        res.json({ error: true, message: 'Código de estado no válido' });
    }
};

module.exports = { handleHttpError };
