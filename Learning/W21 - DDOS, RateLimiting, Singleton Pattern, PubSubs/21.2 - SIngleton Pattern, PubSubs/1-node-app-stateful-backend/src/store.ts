interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

export class GameManager {
    private static instance: GameManager;
    private games: Game[] = [];


    private constructor() {} // Private constructor prevents direct instantiation, or we can say it
    // do not let create any instance for thsi class, i.e outside class.

    
    // only return one instance, 
    public static getInstance(): GameManager{
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public getGames(){
        return this.games;
    }

    // e5e7
    public addMove(gameId: string, move: string):void{
        const game = this.games.find(game=> game.id === gameId);
        if(game){
            game.moves.push(move)
        }
    }

    public addGame(gameId: string, whitePlayerName: string, blackPlayerName: string): void{
        const game = {
            id: gameId, 
            whitePlayerName: whitePlayerName, 
            blackPlayerName: blackPlayerName, 
            moves:  []
        }

        this.games.push(game)
    }

}

// Exporting the singleton instance
export const gameManager = GameManager.getInstance();