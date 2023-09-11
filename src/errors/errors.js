function joi(message) {
  return {
    type: 'joiError',
    message
  }
}

function notFound(resource = 'Item') {
  return {
    type: 'notFound',
    message: `${resource} não foi encontrado!`
  }
}

function conflict(resource = 'Cidade') {
  return {
    type: 'conflict',
    message: `${resource} Já existe`
  }
}

export const errors = { joi, notFound, conflict }
