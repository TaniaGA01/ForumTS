import * as dataBase from './dataBaseApi'

export default class service {
    getDataBase = async (data:any): Promise<any> => {
      try {
        const response = await dataBase.allDataBases(data)
        return response
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
