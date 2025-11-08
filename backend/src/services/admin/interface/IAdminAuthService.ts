

export default interface IAdminAuthService{
    register(
        restaurantName:String,
        email:String,
        password:String,
        role:"admin"|"superadmin",
    ):Promise<{message:string}>
}