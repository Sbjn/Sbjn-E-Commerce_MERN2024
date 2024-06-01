const { default: SumaryApi } = require("../common")

const fetechcategoryByProduct = async (category)=>{

    const response = await fetch(SumaryApi.categoryWiseProduct.url,{
        method: SumaryApi.categoryWiseProduct.method,
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            category:  category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default  fetechcategoryByProduct