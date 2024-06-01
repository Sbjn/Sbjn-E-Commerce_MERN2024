async function userLogout(req, res){
    try {
        res.clearCookie("token")

        res.json({
            message:"Logged out successfully",
            success:true,
            error: false,
            data:[]
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userLogout