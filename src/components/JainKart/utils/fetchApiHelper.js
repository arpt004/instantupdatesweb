export async function fetchAllData() {
    try{   
        const responseFetchAll = await fetch( `/api/jains-kart/fetch-product-data`);
        console.log('responseFetchAll')
        console.log(responseFetchAll)
        if(responseFetchAll.ok){
            const finalData = await responseFetchAll.json()
            console.log('finalData')
            console.log(finalData)
            return finalData
        }
        return []
    }
    catch(error){
        console.log(error)
        return []
    }
}