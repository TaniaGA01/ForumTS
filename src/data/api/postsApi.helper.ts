import * as allPosts from './postsApi';
import type { PostI } from '@/data/data.interfaces'

export default class service {
    getPosts = async (): Promise<PostI[] | any> => {
      try {
        const response = await allPosts.allPosts()
        return response as PostI[]
        
      } catch (error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
          message: message
        }
      }
    }
}
