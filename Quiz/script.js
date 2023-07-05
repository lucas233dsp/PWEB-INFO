(function() {
    var questions = [{
      question: "Quem foi o primeiro presidente do Brasil?",
      choices: ['Jânio Quadros', 'Euclides da Cunha', 'Deodoro da Fonseca', 'Júlio Prestes', 'José de Alencar'],
      correctAnswer: 2
    }, {
      question: "Em que ano acabou a Segunda Guerra Mundial?",
      choices: [1760, 1964, 1890, 1934, 1945],
      correctAnswer: 4
    }, {
      question: "Que empresa foi responsável pelo lançamento do iphone?",
      choices: ['Apple', 'IBM', 'Microsoft', 'Samsung', 'Xiaomi'],
      correctAnswer: 0
    }, {
      question: "Qual destes foi o primeiro homem a pisar na Lua?",
      choices: ['Iuri Gagarin', 'Elon Musk', 'George Soros', 'Neil Armstrong', 'Nikita krushev'],
      correctAnswer: 3
    }, {
      question: "Qual o maior planeta do nosso sistema solar?",
      choices: ['Plutão', 'Mercúrio', 'Vênus', 'Saturno', 'Júpiter'],
      correctAnswer: 4
    }];
    
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    
    displayNext();
    
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      if (isNaN(selections[questionCounter])) {
        alert('Por favor, selecione um item!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
      
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    function displayScore() {
      var score = $('<p>',{id: 'questões'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('Você acertou ' + numCorrect + ' questões de  ' +
                   questions.length +  ' questões ');
      return score;
    }
  })();