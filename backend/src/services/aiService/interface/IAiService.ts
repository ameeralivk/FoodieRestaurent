


export interface IAIService{
    getReply(prompt: string): Promise<string>
}