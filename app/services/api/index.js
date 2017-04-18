import Months from '../../shared/months'

export async function getLists() {
   let response = await fetch('https://api.trello.com/1/boards/G9GKoL5F/lists/open?fields=name,idList')
   let responseJson = await response.json()
   
   const filteredLists = responseJson.filter(item => item.name.split('/').length > 1)

   return filteredLists
}

export async function getCards() {

    let lists = await getLists()    
    const listsIds = lists.map(item => item.id)
    
    let response = await fetch('https://api.trello.com/1/boards/G9GKoL5F/cards/open?fields=desc,idList,name,due,labels')
    let responseJson = await response.json();
    
    let cards = responseJson.filter(item => listsIds.includes(item.idList) && (new Date(item.due) >= new Date()))    
    
    cards = cards.sort((a, b) => {
        const dueDateA = new Date(a.due)
        const dueDateB = new Date(b.due)

        if(dueDateA > dueDateB)
            return 1
        else if (dueDateA < dueDateB)
            return -1
        else
            return 0
    })   

    cards.forEach((item) => {
        let formattedData = new Date(item.due)
        let minutes = "0" + formattedData.getMinutes()
        formattedData = `${Months[formattedData.getMonth()]}, ${formattedData.getDate()} at ${formattedData.getHours()}:${minutes.slice(-2)}`
        
        item.due = formattedData        

        if (item.labels && item.labels.length > 0)
            item.location = item.labels[0].name
    })    


    return cards

    
}