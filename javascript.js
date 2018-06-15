$(document).ready(function(){
    console.log("hello");
    const connect4 = new Connect4('#connect4')

    $('.btn').click(function(){
        connect4.restartGame();
    })
    
});