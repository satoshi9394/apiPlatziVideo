const boom = require('@hapi/boom')
const { allow } = require('@hapi/joi')

function scopesValidationHandler(allowedScopes){
  return function (req, res, next) {
    if(!req.user || (req.user && !req.user.scopes)){
      next(boom.unauthorized('Missing scopes'))
    }

    const hasAccess = allowedScopes
      .map(allowedScopes => req.user.scopes.includes(allowedScopes))
      .find(allowed => Boolean(allowed))
    if(hasAccess){
      next()
    } else{
      next(boom.unauthorized('insufficient scoopes'))
    }  
  }
}

module.exports = scopesValidationHandler;