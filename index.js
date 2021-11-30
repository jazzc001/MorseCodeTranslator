var morseCode =
  "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----";

var morseList = morseCode.split("|");
for (var i = 0; i < morseList.length; i++) {
  morseList[i] = morseList[i].split(";");
  $("ul.translist").append(
    "<li>" + morseList[i][0] + " " + morseList[i][1] + "</li>"
  );
}

//translate each letter to code
function findCode(letter) {
  for (var i = 0; i < morseList.length; i++) {
    if (morseList[i][0] == letter) {
      return morseList[i][1];
    }
  }
  return letter;
}

//translate each code to letter
function findLetter(code) {
  for (var i = 0; i < morseList.length; i++) {
    if (morseList[i][1] == code) {
      return morseList[i][0];
    }
  }
  return code;
}

function translateToMore(text) {
  text = text.toUpperCase();
  var result = "";
  for (var i = 0; i < text.length; i++) {
    result += findCode(text[i]) + " ";
  }
  return result;
}

function translateToEng(text) {
  text = text.split(" ");
  var result = "";
  for (var i = 0; i < text.length; i++) {
    result += findLetter(text[i]);
  }
  return result;
}

$("#btnMorse").click(function () {
  var input = $("#input").val();
  var result = translateToMore(input);
  $("#output").val(result);
  $("#output")
    .css({
      backgroundColor: "#292B73"
    })
    .animate(
      {
        backgroundColor: "transparent"
      },
      500
    );
  $(".symbol").velocity({
    rotateZ: ["0deg", "360deg"]
  });
});

$("#btnEng").click(function () {
  var input = $("#output").val();
  var result = translateToEng(input);
  $("#input").val(result);
  $("#input")
    .css({
      backgroundColor: "#292B73"
    })
    .animate(
      {
        backgroundColor: "transparent"
      },
      500
    );
  $(".symbol").velocity({
    rotateZ: ["0deg", "360deg"]
  });
});

$("#input").keyup(function () {
  var original = $("#input").val();
  var newtext = original.toUpperCase().split(" ").join("");
  $("#input").val(newtext);
});

function play(texts, nowindex) {
  var word = texts[nowindex];
  var lasttime = 300;
  if (word == ".") {
    lasttime = 300;
    $("audio.short")[0].play();
  } else if (word == "-") {
    lasttime = 500;
    $("audio.long")[0].play();
  } else {
    lasttime = 1000;
  }
  console.log(word, lasttime);

  $(".playlist span").removeClass("playing");
  $(".playlist span").eq(nowindex).addClass("playing");

  if (texts.length > nowindex) {
    playerTimer = setTimeout(function () {
      play(texts, nowindex + 1);
    }, lasttime);
  } else {
    $(".playlist").html("");
  }
}

// play("..-.",2)

$("audio.short")[0].volume = 0.3;
$("audio.long")[0].volume = 0.3;

//Play the sound
$("#btnPlay").click(function () {
  //manage output
  var texts = $("#output").val();
  $(".playlist").html("");

  //put the color on the text
  for (var i = 0; i < texts.length; i++) {
    $(".playlist").append("<span>" + texts[i] + "</span>");
  }
  play(texts, 0);
});
