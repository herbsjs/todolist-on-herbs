/* eslint-disable no-console */
import axios from 'axios'
import environment from '../config/Config'

async function deleteList(listId) {
  try {
    const api = axios.create({
      baseURL: environment.apiSettings.baseUrl
    })

    await api.delete(`lists/${listId}`)
  } catch (error) {
    console.error(error)
  }
}

export { deleteList }
