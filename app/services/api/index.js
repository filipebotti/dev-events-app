const months =  ["janeiro", "fevereiro", "março", "abril", 
                "maio", "junho", "julho", "agosto", "setembro", 
                "outubro", "novembro", "dezembro"]

export async function getLists() {
   let response = await fetch('https://api.trello.com/1/boards/G9GKoL5F/lists/open?fields=name,idList')
   let responseJson = await response.json()
   
   const filteredLists = responseJson.filter(item => item.name.split('/').length > 1)

   return filteredLists
}

export async function getCards() {

    let lists = await getLists()    
    const listsIds = lists.map(item => item.id)
    
    let response = await fetch('https://api.trello.com/1/boards/G9GKoL5F/cards/open?fields=desc,idList,name,due')
    let responseJson = await response.json();
    
    let filteredCards = responseJson.filter(item => listsIds.includes(item.idList) && (new Date(item.due) >= new Date()))    
    
    filteredCards = filteredCards.sort((a, b) => {
        const dueDateA = new Date(a.due)
        const dueDateB = new Date(b.due)

        if(dueDateA > dueDateB)
            return 1
        else if (dueDateA < dueDateB)
            return -1
        else
            return 0
    })   


    return filteredCards

    
}