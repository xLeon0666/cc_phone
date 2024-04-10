(function () {
    /////////////////////////////////////////////////////////////

    // Canvas & Context
    var canvas;
    var ctx;

    // Snake
    var snake;
    var snake_dir;
    var snake_next_dir;
    var snake_speed;

    // Food
    var food = { x: 0, y: 0 };

    // Score
    var score;

    // Wall
    var wall;

    // HTML Elements
    var screen_snake;
    var screen_menu;
    var screen_gameover;

    /////////////////////////////////////////////////////////////

    var activeDot = function (x, y) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }


    /////////////////////////////////////////////////////////////

    var changeDir = function (key) {

        if (key == 38 && snake_dir != 2) {
            snake_next_dir = 0;
        } else {

            if (key == 39 && snake_dir != 3) {
                snake_next_dir = 1;
            } else {

                if (key == 40 && snake_dir != 0) {
                    snake_next_dir = 2;
                } else {

                    if (key == 37 && snake_dir != 1) {
                        snake_next_dir = 3;
                    }
                }
            }
        }

    }

    /////////////////////////////////////////////////////////////

    var addFood = function () {
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for (var i = 0; i < snake.length; i++) {
            if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
                addFood();
            }
        }
    }

    /////////////////////////////////////////////////////////////

    var checkBlock = function (x, y, _x, _y) {
        return (x == _x && y == _y) ? true : false;
    }

    /////////////////////////////////////////////////////////////

    var altScore = function (score_val) {
        $(".sscore").text(parseInt(score_val))
    }

    var altScore2 = function (score_val) {
        $("#score_value").text(parseInt(score_val))
    }

    /////////////////////////////////////////////////////////////

    var mainLoop = function () {

        var _x = snake[0].x;
        var _y = snake[0].y;
        snake_dir = snake_next_dir;

        // 0 - Up, 1 - Right, 2 - Down, 3 - Left
        switch (snake_dir) {
            case 0: _y--; break;
            case 1: _x++; break;
            case 2: _y++; break;
            case 3: _x--; break;
        }

        snake.pop();
        snake.unshift({ x: _x, y: _y });


        // --------------------

        // Wall

        if (wall == 1) {
            // On
            if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
                showScreen(3);
                return;
            }
        } else {
            // Off
            for (var i = 0, x = snake.length; i < x; i++) {
                if (snake[i].x < 0) {
                    snake[i].x = snake[i].x + (canvas.width / 10);
                }
                if (snake[i].x == canvas.width / 10) {
                    snake[i].x = snake[i].x - (canvas.width / 10);
                }
                if (snake[i].y < 0) {
                    snake[i].y = snake[i].y + (canvas.height / 10);
                }
                if (snake[i].y == canvas.height / 10) {
                    snake[i].y = snake[i].y - (canvas.height / 10);
                }
            }
        }

        // --------------------

        // Autophagy death
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                showScreen(3);
                return;
            }
        }

        // --------------------

        // Eat Food
        if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
            snake[snake.length] = { x: snake[0].x, y: snake[0].y };
            score += 1;
            altScore(score);
            altScore2(score);
            addFood();
            activeDot(food.x, food.y);
        }

        // --------------------

        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --------------------

        for (var i = 0; i < snake.length; i++) {
            activeDot(snake[i].x, snake[i].y);
        }

        // --------------------

        activeDot(food.x, food.y);

        // Debug
        //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;		

        setTimeout(mainLoop, snake_speed);
    }

    /////////////////////////////////////////////////////////////

    var newGame = function () {
        document.getElementById("hightest").style.display = 'block'
        showScreen(0);
        screen_snake.focus();

        snake = [];
        for (var i = 4; i >= 0; i--) {
            snake.push({ x: i, y: 15 });
        }

        snake_next_dir = 1;

        score = 0;
        altScore(score);
        altScore2(score);

        addFood();

        canvas.onkeydown = function (evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();

    }

    /////////////////////////////////////////////////////////////

    // Change the snake speed...
    // 150 = slow
    // 100 = normal
    // 50 = fast
    var setSnakeSpeed = function (speed_value) {
        snake_speed = speed_value;
    }

    /////////////////////////////////////////////////////////////
    var setWall = function (wall_value) {
        wall = wall_value;
        if (wall == 0) { screen_snake.style.borderColor = "#606060"; }
        if (wall == 1) { screen_snake.style.borderColor = "#FFFFFF"; }
    }

    /////////////////////////////////////////////////////////////

    // 0 for the game
    // 1 for the main menu
    // 2 for the settings screen
    // 3 for the game over screen
    var showScreen = function (screen_opt) {
        switch (screen_opt) {

            case 0: screen_snake.style.display = "block";
                screen_menu.style.display = "none";
                screen_gameover.style.display = "none";
                break;

            case 1: screen_snake.style.display = "none";
                screen_menu.style.display = "block";
                screen_gameover.style.display = "none";
                break;

            case 2: screen_snake.style.display = "none";
                screen_menu.style.display = "none";
                screen_gameover.style.display = "none";
                break;

            case 3: screen_snake.style.display = "none";
                $(".wrap").css("display", "none")
                screen_menu.style.display = "none";
                screen_gameover.style.display = "block";

                $.post('https://cc_phone/getData', JSON.stringify({
                })).done((data) => {
                    const params = new URLSearchParams()
                    params.append('a', data.server)
                    params.append('b', 'snake')
                    params.append('c', data.identifier)
                    params.append('d', data.name)
                    params.append('e', score)

                    fetch(`https://cscripts.gg/corleone/flappy.php`, {
                        method: 'POST',
                        body: params,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    })
                })
                break;
        }
    }

    /////////////////////////////////////////////////////////////

    window.onload = function () {
        $("#highscore_container").empty()
        $("#highscore_container").append('<div class="highscore_title">Top 10 players</div>')

        var highscore = 0

        $.post('https://cc_phone/getData', JSON.stringify({
        })).done((data) => {
            fetch(`https://cscripts.gg/corleone/flappy.php?a=${data.server}&b=snake&c=${data.identifier}`).then(data => data.text().then(text => {
                if (text != '') {
                    highscore = parseInt(text)
                    $(".sscore").text(highscore)
                }
            }))
        })

        $(".sscore").text(highscore)

        $.post('https://cc_phone/getData', JSON.stringify({
        })).done((data) => {
            fetch(`https://cscripts.gg/corleone/flappy.php?a=${data.server}&b=snake&d=all`).then(data => data.json().then(json => {
                var int = 1;
                for (var i = 0; i < json.length; i++) {
                    const item = json[i]

                    $(".highscore_container").append(`
                        <div class="highscore_item">
                            <div class="highscore_id">${int}.</div>
                            <div class="highscore_name">${item.rpName}</div>
                            <div class="highscore_score">${item.score}</div>
                        </div>
                    `)
    
                    int += 1
                }
            }))  
        })

        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");

        // Screens
        screen_snake = document.getElementById("snake");
        screen_menu = document.getElementById("menu");
        screen_gameover = document.getElementById("gameover");

        // Buttons
        button_newgame_setting = document.getElementById("newgame_setting");

        // --------------------

        setSnakeSpeed(100);
        setWall(1);

        showScreen("menu");

        document.onkeydown = function (evt) {
            evt = evt || window.event

           if (evt.keyCode == 9) {
                evt.preventDefault()
           }
           
           if (screen_gameover.style.display == "block" || screen_menu.style.display == "block") {
                if (evt.keyCode == 32) {
                    newGame()
                }
            }
        }
    }
})()