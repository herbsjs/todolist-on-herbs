import 'dotenv/config'

const apiSettings = {
  baseUrl: process.env.REACT_APP_API_URL,
}

const environment = {
  apiSettings,
  isProduction: process.env.REACT_APP_IS_PRODUCTION === 'true',
  isDevMode: process.env.REACT_APP_IS_DEV === 'true',
}

export default environment
