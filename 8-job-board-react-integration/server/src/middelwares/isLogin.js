// ========= Is Login Middleware
// import all packages
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const isLogin = (req, res, next) => {
  const token = req.header('X-ACCESS-TOKEN')

  if (!token) {
    req.app.locals.auth = {
      data: null,
      message: 'Access token is required'
    }
  } else {
    try {
      const decoded = jwt.verify(token, config.SECRET_KEY)
      req.app.locals.auth = {
        data: decoded,
        message: null
      }
    } catch (err) {
      req.app.locals.auth = {
        data: null,
        message: err.message
      }
    }
  }

  next()
}
