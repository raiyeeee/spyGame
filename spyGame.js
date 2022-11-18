
import {$} from "./jquery-3.0.0.js" 
    var starter;
    var timer = 0;
    var timerClear;
    var paused = false;
    var level = 1;
    var noOfContinousCorrectAnswers = 0;
    var timeUp = false;
    var optionClicked = false;
    var CurrentChoices = [".", ".", "."];
    var questions =
          [
        "red",
        "blue",
        "green",
        "yellow",
        "black",
        "pink",
        "purple",
        "grey"
          ]
    var lastCorrectAnswer = 0;
    function pause ()
    {
        if (paused == false)
        {
            paused = true;
            document.getElementById("pause").innerHTML = "Continue";
            document.getElementById("choice1").innerHTML = ".";
            document.getElementById("choice2").innerHTML = ".";
            document.getElementById("choice3").innerHTML = ".";
        }
        else
        {
            paused = false;
            document.getElementById("pause").innerHTML = "Pause";
            document.getElementById("choice1").innerHTML =CurrentChoices[0];
            document.getElementById("choice2").innerHTML =CurrentChoices[1];
            document.getElementById("choice3").innerHTML =CurrentChoices[2];

        }
    }
    function assignQuestion()
    {
        var questionIndex = Math.floor(Math.random() * questions.length);

        var realColorIndex = questionIndex;

        while (realColorIndex == questionIndex)
        {
           realColorIndex = Math.floor(Math.random() * questions.length);
        }

        document.getElementById("question").innerHTML = questions[questionIndex];
        document.getElementById("question").style.color = questions[realColorIndex];
        //document.getElementById("question").style.backroundColor = questions[realColorIndex];
        return [realColorIndex,questionIndex];
    }

    function assignChoices(ColorIndexes)
    {
        var randomNo = Math.random();
        var correctAnswerChoiceNo;
        if (randomNo <= 0.33)
        {
            correctAnswerChoiceNo = 0;
        }
        else if (randomNo <= 0.66)
        {
            correctAnswerChoiceNo = 1;

        }
        else
        {
            correctAnswerChoiceNo = 2;
        }


        if ((correctAnswerChoiceNo == lastCorrectAnswer) && (correctAnswerChoiceNo < 2))
        {
            if (Math.random() > 0.5)
            {
                correctAnswerChoiceNo++;
            }
            else
            {
                if (correctAnswerChoiceNo == 1)
                {
                    correctAnswerChoiceNo--;
                }
            }
        }
        lastCorrectAnswer = correctAnswerChoiceNo;

        if (correctAnswerChoiceNo == 0)
        {
            document.getElementById("choice1").innerHTML = questions[ColorIndexes[0]];
            CurrentChoices[0] = questions[ColorIndexes[0]];
        }
        else if (correctAnswerChoiceNo == 1)
        {
            document.getElementById("choice2").innerHTML = questions[ColorIndexes[0]];
            CurrentChoices[1] = questions[ColorIndexes[0]];

        }
        else
        {
            document.getElementById("choice3").innerHTML = questions[ColorIndexes[0]];
            CurrentChoices[2] = questions[ColorIndexes[0]];
        }


        var option1ColorIndex = ColorIndexes[0];


        while ((option1ColorIndex == ColorIndexes[0]) || (option1ColorIndex == ColorIndexes[1]))
        {

            option1ColorIndex = Math.floor(Math.random() * questions.length);

        }

        if (correctAnswerChoiceNo==0)
        {
            document.getElementById("choice2").innerHTML = questions[ColorIndexes[1]];
            CurrentChoices[1] = questions[ColorIndexes[1]];
            document.getElementById("choice3").innerHTML = questions[option1ColorIndex];
            CurrentChoices[2] = questions[option1ColorIndex];
        }
        else if (correctAnswerChoiceNo == 1)
        {
            document.getElementById("choice1").innerHTML = questions[ColorIndexes[1]];
            CurrentChoices[0] = questions[ColorIndexes[1]];
            document.getElementById("choice3").innerHTML = questions[option1ColorIndex];
            CurrentChoices[2] = questions[option1ColorIndex];
        }
        else
        {
            document.getElementById("choice1").innerHTML = questions[option1ColorIndex];
            CurrentChoices[0] = questions[option1ColorIndex];

            document.getElementById("choice2").innerHTML = questions[ColorIndexes[1]];
            CurrentChoices[1] = questions[ColorIndexes[1]];
        }


    }

    function choiceClicked (answer)
    {

        if (paused==false){
        if (optionClicked == false)
        {
              optionClicked = true;
              if (timeUp == true)
              {
              //do nothing
              }
              else
              {
              checkAnswer(answer);
              }

            }
        }
    }

    function checkAnswer(answer)
    {
        window.clearTimeout(starter);
        window.clearTimeout(timerClear);

        question=document.getElementById("question").style.color;
        if (answer == question)
        {
            $("#correct").show();
            $("#wrong").hide();
            $("#placeholder").hide();
            noOfContinousCorrectAnswers++;
        }
        else
        {
            $("#wrong").show();
            $("#correct").hide();
            $("#placeholder").hide();
            noOfContinousCorrectAnswers = 0;
        }


        starter=window.setTimeout(start, 1000);
        //start();
    }

    function timeWriter()
    {


        if (paused == false)
        {

            document.getElementById("timer").innerHTML = "Level:"+level+"     Time:"+timer +" Correct:"+noOfContinousCorrectAnswers;
            timer--;
            if (timer >= 0) {
                timerClear = window.setTimeout(timeWriter, 1000);
            }
            else {
                timeUp = true;
                checkAnswer();
            }

        }
        else
        {

            timerClear = window.setTimeout(timeWriter, 1000);

        }



    }

    function startClicked()
    {
        document.getElementById("start").innerHTML = "Restart";
        window.clearTimeout(starter);
        window.clearTimeout(timerClear);
        level = 1;
        noOfContinousCorrectAnswers = 0;
        paused = false;
        document.getElementById("pause").innerHTML = "Pause";
        timeUp = false;
        optionClicked = false;
        start();
    }
    function start()
    {
        if (paused==false){
            window.clearTimeout(starter);
            window.clearTimeout(timerClear);

           if (noOfContinousCorrectAnswers >= 5)
            {
            level++;
            noOfContinousCorrectAnswers = 0;
            }

            $("#wrong").hide();
            $("#correct").hide();
            $("#placeholder").show();
            $("#choice1").show();
            $("#choice2").show();
            $("#choice3").show();
            var ColorIndexes = assignQuestion();
            assignChoices(ColorIndexes);

            if (level == 1)
            {
            timer = 5;
            }
            else if (level==2)
            {
                 timer = 4;
            }
            else if (level == 3)
            {
              timer = 3;
            }
            else if (level == 4) {
              timer = 2;
            }
          else {
              timer = 1;
            }

        //document.getElementById('timer').innerHTML = timer;
        //timer--;
        //timerClear = window.setTimeout(timeWriter, 1000);
        timeUp = false;
        optionClicked = false;
        timeWriter();

        }
        else
        {

            starter = window.setTimeout(start, 1000);
        }
    }
    function testTimeOut()
    {
       checkAnswer();
    }
