


export default interface IUserAuthService{
    register(name:string,email:string,password:string):Promise<{success:boolean,message:string}>
}