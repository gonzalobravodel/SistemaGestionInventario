/*const swaggerJsdoc = require("swagger-jsdoc");


* API Config Info


const swaggerDefinition = {
    openapi: "3.0.1", 
    info: {
        title:"Documentacion de API par Sistema de Gestion de Inventario de Farmacia",
        version : '1.0.0',
        description :"Es una API Rest que permite trabajar con información sobre usuarios y la base de datos de los productos de la farmacia",
    },
    servers: [
        {
            url: "http://localhost:2001/api"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["objeto"],
                properties: {
                  objeto: {
                    type: "string"
                  },
                  cantidad: {
                    type: "number"
                  },
                  propiedades: {
                    type: "object",
                    properties: {
                      tipo: {
                        type: "string"
                      },
                      receta: {
                        type: "boolean"
                      }
                    }
                  },
                  descripcion: {
                    type: "string"
                  },
                  objetoId: {
                    type: "string"
                  }
                }
            },
            authRegister: {
                type: "object",
                required: ["objeto"],
                properties: {
                    objeto:{
                        type:"string",
                    }, 
                    cantidad: {
                        type: "number",
                    },
                    propiedades: {
                        type: "object",
                        tipo: {
                            type:"string",
                        },
                        receta: {
                            type: "boolean",
                        }
                    },
                    descripcion: {
                        type : "string",
                    },
                    objetoId: {
                        type: "string",
                    },
                }
            },
            producto: {
                type: "object",
                required: ["objeto"],
                properties: {
                    objeto:{
                        type:"string",
                    }, 
                    cantidad: {
                        type: "number",
                    },
                    propiedades: {
                        type: "object",
                        tipo: {
                            type:"string",
                        },
                        receta: {
                            type: "boolean",
                        }
                    },
                    descripcion: {
                        type : "string",
                    },
                    objetoId: {
                        type: "string",
                    },
                }
            },
            storage: {
                type: "object",
                required: ["objeto"],
                properties: {
                    type: "object",
                    objeto:{
                        type:"string",
                    }, 
                    cantidad: {
                        type: "number",
                    },
                    propiedades: {
                        tipo: {
                            type:"string",
                        },
                        receta: {
                            type: "boolean",
                        }
                    },
                    descripcion: {
                        type : "string",
                    },
                    objetoId: {
                        type: "string",
                    },
                }
            }
        }
    }
};



* Opciones

const options = {
    swaggerDefinition,
    apis: [
        "./routes/*.js"
    ]
};

const openApiConfiguration = swaggerJsdoc(options);

module.exports=openApiConfiguration;

*/