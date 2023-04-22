export default function JoinGame() {
    return (
        <div className="bg-dark text-white p-3">
            <form>
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto border rounded p-2">
                        <h1 className="mb-2 text-center">Join Game</h1>
                        <label htmlFor="gameCode" className="float-left">Game Code</label>
                        <input type="text" className="form-control mb-1" id="gameCode" placeholder="Enter game code" />
                        <label htmlFor="playerName" className="float-left">Player Name</label>
                        <input type="text" className="form-control mb-3" id="playerName" placeholder="Enter player name" />
                        <button type="submit" className="btn btn-primary col-12">Join Game</button>
                    </div>
                </div>
            </form>
            <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto">
                By clicking Play, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy.</a>
            </div>
        </div>
    );
}