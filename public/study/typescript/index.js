"use strict";
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// 구구단
var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var _main = document.querySelector('.content.times-table');
var question = document.createElement('div');
question.textContent = numberOne + " \uACF1\uD558\uAE30 " + numberTwo + "\uB294??";
_main.append(question);
var form = document.createElement('form');
_main.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);
var resultDiv = document.createElement('div');
_main.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        question.textContent = numberOne + " \uACF1\uD558\uAE30 " + numberTwo + "\uB294??";
        resultDiv.textContent = '딩동댕';
        input.value = '';
        input.focus();
    }
    else {
        resultDiv.textContent = '땡';
        input.value = '';
        input.focus();
    }
});
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
//  숫자 야구
var body = document.body;
var candidate;
var selectNumbers;
var strike;
var ball;
var contentBody = body.querySelector('.content.number-baseball');
var buttonSendNumber = contentBody.querySelector('.button.send-number');
var baseballGameResult = contentBody.querySelector('.result');
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    selectNumbers = [];
    strike = 0;
    ball = 0;
    for (var i = 0; i < 4; i++) {
        var item = candidate.splice(Math.floor(Math.random() * 9 - i), 1)[0];
        selectNumbers.push(item);
    }
    console.log('정답kkkkkk =', selectNumbers);
}
chooseNumber();
buttonSendNumber.addEventListener('click', function (event) {
    event.preventDefault();
    var answer = document.querySelector('#inputNumber');
    if (answer.value === selectNumbers.join('')) {
        baseballGameResult.textContent = '정답';
        chooseNumber();
    }
    else {
        strike = 0;
        ball = 0;
        var answerNumber = answer.value.split('');
        console.log('answerNumber =', answerNumber);
        console.log('answerNumber =', answerNumber[1]);
        console.log('selectNumbers =', selectNumbers.join(''));
        for (var i = 0; i < 4; i++) {
            if (selectNumbers[i] === Number(answerNumber[i])) {
                strike += 1;
            }
            else if (selectNumbers.join('').indexOf(answerNumber[i]) > -1) {
                ball += 1;
            }
        }
        baseballGameResult.textContent = "\uC624\uB2F5 " + strike + " Strike & " + ball + " Ball \uC785\uB2C8\uB2E4.";
    }
});
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
//  자스스톤
var _player1 = document.querySelector('#player1');
var _player2 = document.querySelector('#player2');
var opponent = {
    hero: _player1.querySelector('.card.type_hero'),
    deck: _player1.querySelector('.deck'),
    field: _player1.querySelector('.normal-card--wrap'),
    cost: _player1.querySelector('.cost_remain'),
    // hero: document.getElementById('rival-hero') as HTMLDivElement,
    // deck: document.getElementById('rival-deck') as HTMLDivElement,
    // field: document.getElementById('rival-cards') as HTMLDivElement,
    // cost: document.getElementById('rival-cost') as HTMLDivElement,
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: _player2.querySelector('.card.type_hero'),
    deck: _player2.querySelector('.deck'),
    field: _player2.querySelector('.normal-card--wrap'),
    cost: _player2.querySelector('.cost_remain'),
    // hero: document.getElementById('my-hero') as HTMLDivElement,
    // deck: document.getElementById('my-deck') as HTMLDivElement,
    // field: document.getElementById('my-cards') as HTMLDivElement,
    // cost: document.getElementById('my-cost') as HTMLDivElement,
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.mine = mine;
        this.field = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.mine = mine;
        this.field = false;
    }
    return Sub;
}());
var isSub = function (data) {
    if (data.cost) {
        return true;
    }
    return false;
};
var turnButton = document.querySelector('.turn-over');
var turn = true; // true면 내턴, false면 상대 턴
function initiate() {
    ;
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: false, count: 5 }); // 상대 덱 생성
    createDeck({ mine: true, count: 5 }); // 내 덱 생성
    createHero({ mine: false }); // 상대 영웅 그리기
    createHero({ mine: true }); // 내 영웅 그리기
    redrawScreen({ mine: false }); // 상대화면
    redrawScreen({ mine: true }); // 내화면
}
initiate(); // 진입점
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM(player.heroData, player.hero, true);
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawField(player);
    redrawDeck(player);
    redrawHero(player);
}
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach(function (data) {
        connectCardDOM(data, target.field);
    });
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM(data, target.deck);
    });
}
function redrawHero(target) {
    if (!target.heroData) {
        console.error(target);
        throw new Error('heroData가 없습니다');
    }
    target.hero.innerHTML = '';
    connectCardDOM(target.heroData, target.hero, true);
}
function connectCardDOM(data, DOM, hero) {
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card_att').textContent = String(data.att);
    cardEl.querySelector('.card_hp').textContent = String(data.hp);
    if (hero) {
        ;
        cardEl.querySelector('.card_cost').style.display = 'none';
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card_cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', function () {
        if (isSub(data) && data.mine === turn && !data.field) {
            // 자신의 덱에 있는 쫄병이면
            if (!deckToField({ data: data })) {
                // 쫄병을 하나 뽑았으면
                createDeck({ mine: turn, count: 1 });
            }
        }
        turnAction({ cardEl: cardEl, data: data });
    });
    DOM.appendChild(cardEl);
}
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : opponent; // 조건 ? 참 : 거짓;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        // 코스트가 모자르면 종료
        alert('코스트가 모자릅니다.');
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawField(target);
    redrawDeck(target);
    target.cost.textContent = String(currentCost - data.cost); // 남은 코스트 줄이기
    return false;
}
function turnAction(_a) {
    var cardEl = _a.cardEl, data = _a.data;
    var team = turn ? me : opponent; // 지금 턴의 편
    var enemy = turn ? opponent : me; // 그 상대 편
    if (cardEl.classList.contains('card-turnover')) {
        // 턴이 끝난 카드면 아무일도 일어나지 않음
        return;
    }
    var enemyCard = turn ? !data.mine : data.mine;
    if (enemyCard && team.chosenCardData) {
        // 선택한 카드가 있고 적군 카드를 클릭한 경우 공격 수행
        data.hp = data.hp - team.chosenCardData.att;
        if (data.hp <= 0) {
            // 카드가 죽었을 때
            if (isSub(data)) {
                // 쫄병이 죽었을 때
                var index = enemy.fieldData.indexOf(data);
                enemy.fieldData.splice(index, 1);
            }
            else {
                // 영웅이 죽었을 때
                alert('승리하셨습니다!');
                initiate();
            }
        }
        redrawScreen({ mine: !turn }); // 상대 화면 다시 그리기
        if (team.chosenCard) {
            // 클릭 해제 후 카드 행동 종료
            team.chosenCard.classList.remove('card-selected');
            team.chosenCard.classList.add('card-turnover');
        }
        team.chosenCard = null;
        team.chosenCardData = null;
        return;
    }
    else if (enemyCard) {
        // 상대 카드면
        return;
    }
    if (data.field) {
        // 카드가 필드에 있으면
        //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
        // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected');
        });
        console.log(cardEl);
        cardEl.classList.add('card-selected');
        team.chosenCard = cardEl;
        team.chosenCardData = data;
    }
}
turnButton.addEventListener('click', function () {
    var target = turn ? me : opponent;
    _player1.classList.toggle('turn');
    _player2.classList.toggle('turn');
    // document.getElementById('rival')!.classList.toggle('turn')
    // document.getElementById('my')!.classList.toggle('turn')
    redrawField(target);
    redrawHero(target);
    turn = !turn; // 턴을 넘기는 코드
    if (turn) {
        me.cost.textContent = '10';
    }
    else {
        opponent.cost.textContent = '10';
    }
});
//  가위-바위-보
var imgCoords = '0';
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
function computerChoice(imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
}
var interval;
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        if (document.querySelector('#computer')) {
            ;
            document.querySelector('#computer').style.background =
                'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
        }
    }, 100);
}
intervalMaker();
document.querySelectorAll('.rock-paper-scissors .btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(interval);
        setTimeout(intervalMaker, 1000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log('비겻다');
        }
        else if ([-1, 2].includes(diff)) {
            console.log('이겼다');
        }
        else {
            console.log('졌다!!!!!!');
        }
    });
});
