import * as allThreads from './threadsApi';
import type { ThreadI } from '@/data/data.interfaces'

export default class service {
    getThreads = async (): Promise<ThreadI[] | any> => {
      try {
        const response = await allThreads.allThreads()
        return response as ThreadI[]
        
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
