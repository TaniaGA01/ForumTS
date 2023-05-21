import * as allUsers from './usersApi'
import type { UserI } from '@/data/data.interfaces'

export default class service {
    getUsers = async (): Promise<UserI[] | any> => {
      try {
        const response = await allUsers.allUsers()
        return response as UserI[]
        
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
