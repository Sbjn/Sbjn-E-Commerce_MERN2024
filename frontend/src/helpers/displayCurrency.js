const displayJPCurrency = (num) =>{
    const formatter = new Intl.NumberFormat('ja-JP',{
        style: "currency",
        currency: "JPY",
        minimunFractionDigitals: 2
    })

    return formatter.format(num)
}

export default displayJPCurrency