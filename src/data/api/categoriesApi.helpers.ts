import * as allCategories from './categoriesApi'
import type { CategoryI } from '@/data/data.interfaces'

export default class service {
    getUsers = async (): Promise<CategoryI[] | any> => {
      try {
        const response = await allCategories.allCategories()
        return response as CategoryI[]
        
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
