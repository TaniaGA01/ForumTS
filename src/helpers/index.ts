export const findBySameId = (resources: any[], id: any) => 
resources.find( r => r.id === id)

export const replaceItem = (resources: any[], id: any, item:any) => {
    const findItem = resources.map(r => r.id === id)
    const findPostIndex = findItem.findIndex(i => i === true)
    resources.splice(findPostIndex, 1, item)
}

export const itemCounter = (resource:any[]) =>{
    if (resource?.length === 0 || undefined){
        return 0
    }else{
        return resource?.length
    }

}