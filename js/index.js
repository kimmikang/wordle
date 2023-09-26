//정답 지정해주기
const 정답 = "APPLE";

let attempts = 0; //몇번째시도인지
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    //div라는 엘레먼트를 만드는 방법(DOM조작)
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-item:center; position:absolute;  top:40vh; left:43vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
    //바디밑에 div를 넣는거다.
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    //게임오버가 되면 이벤트리스너가 지워지면서 키가 안먹음
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameOver();
    //6개 끝나면 값 반환 게임오버를 호출하고 게임끝!
    attempts += 1;
    //다음줄로 넘겨주기 / 한줄을 나타내는 단 attemts
    index = 0; //몇번째 글자인지 알려주는 지를 초기화 시켜주는애
    //그럼 다시 게임이 진행됨
  };

  const handleKEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.main_square_contents[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6aaa64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#c9b458";
      //abc.includes(a) = abc중에 a가 포함됐는지 확인하는 함수
      //정답이면 초록색으로 보이고 같진 않지만 글씨가 포함되어있으면 노란색으로 표시해
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameOver();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.main_square_contents[data-index='${attempts}${index - 1}']`
        //`${attempts}${index}`라는 변수를 가져와서 업뎃해주기
      );
      //인덱스가 0보다 클때 블럭을 선택해서 블럭의 내용을 없애주고 인덱스를 하나 줄여줌
      preBlock.innerText = "";
      //디스블록에 텍스트를 빈 텍스트로 만들어버리기
    }
    if (index !== 0) index -= 1;
    //인덱스가 0일때는 동작하지않게 하며 인데스를 1하나 줄이기
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase(); //키를 대문자로 업뎃해주는 uppercase
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.main_square_contents[data-index='${attempts}${index}']`
      //`${attempts}${index}`라는 변수를 가져와서 업뎃해주기
    );
    //값 가져오기[속성도 가져와야함] 현재 위치 00이라는 위치를 가진 블럭

    if (event.key === "Backspace") handleBackspace();
    //백스페이스 클릭했을때 지우는 기능 넣기
    else if (index === 5) {
      if (event.key === "Enter") handleKEnterKey();
      else return;
    } //인덱스가 5일때 즉 끝까지 단어가 입력이 됐을때
    //엔더키를 누르면 엔터키에 대한 동작이 일어나고
    //엔터키가 아닌 다른키가 눌리면 그냥 return해서 끝내라
    else if (65 <= keyCode && keyCode <= 90) {
      //키코드를 이용해서 알파벳만 뽑아내기 a가 65번이라 65보다 크고 90보다 작은걸 뽑아내기
      //이걸 입력하면서 스페이스 쉬프트 이제 이런거 입력안됨
      //&& 란 and
      thisBlock.innerText = key;
      //위에 if문이 만족됐을때 innerText가 업뎃됨
      index += 1;
      //업뎃하고 인덱스가 하나 늘어남 그리고 다음으로 넘어가도록 해주는거
    }
  };

  const startTimer = () => {
    const startTime = new Date(); //시작시간

    function setTime() {
      const nowTime = new Date(); //현재시간
      const pastTime = new Date(nowTime - startTime); //흐른시간
      const minutes = pastTime.getMinutes().toString();

      const seconds = pastTime.getSeconds().toString();
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `${minutes.padStart(2, "0")}:${seconds.padStart(
        2,
        "0"
      )}`;
    }

    timer = setInterval(setTime, 1000);
    console.log(timer);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  //윈도우이벤트.이벤트리스너.키다운
}

appStart();
