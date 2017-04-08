const months =  ["janeiro", "fevereiro", "março", "abril", 
                "maio", "junho", "julho", "agosto", "setembro", 
                "outubro", "novembro", "dezembro"]

export async function getLists() {
   let response = await fetch('https://api.trello.com/1/boards/G9GKoL5F/lists/open?fields=name,idList')
   let responseJson = await response.json()



   
}