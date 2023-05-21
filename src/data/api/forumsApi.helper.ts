import * as allForums from './forumsApi'
import type { ForumElementI } from '@/data/data.interfaces'

export default class service {
    getForums = async (): Promise<ForumElementI[] | any> => {
      try {
        const response = await allForums.allForums()
        return response as ForumElementI[]
        
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
