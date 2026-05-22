import { StudentBase } from "./StudentBase";

export class GPTAddict extends StudentBase {
  introduce(): string {
    return `🤖 ${this.name} · ${this.mainLanguage} — "프롬프트 한 줄이면 과제 끝, 세상 참 편해졌죠?"`;
  }

  study(): string {
    this._intelligence += 15;
    this._mental -= 10;
    return "프롬프트 복붙은 편하지만 영혼이 갈려나간다..";
  }

  takeExam(): string {
    if (this.mental >= 70) {
      this._intelligence *= 2;
      this._points += 1;
      return "교수님, 이건 제가 직접 짠 코드입니다! (챗GPT한테 물어본 거 아님)";
    }
    this._intelligence = 0;
    this._mental -= 40;
    return "서버 다운에 표절 검사까지 걸렸다... 이번 시험은 완전 폭망이다.";
  }
}

export class CoffeeLover extends StudentBase {
  introduce(): string {
    return `☕ ${this.name} · ${this.mainLanguage} — "카페인 없으면 컴파일도 안 돼요."`;
  }

  study(): string {
    this._intelligence += 35;
    this._mental -= 30;
    return "벼락치기 가자!! 몬스터 마셔!!";
  }

  takeExam(): string {
    if (this.mental < 20) {
      this._intelligence += 5;
      return "카페인 크래시... 시험지 위에 머리만 꿇었다.";
    }
    this._intelligence += 20;
    this._points += 1;
    return "심장이 터질 것 같지만, 손이 멈추질 않는다!! 만점 각!";
  }
}

export class Bokhaksaeng extends StudentBase {
  introduce(): string {
    return `🎓 ${this.name} · ${this.mainLanguage} — "충성! 18학번 복학생입니다."`;
  }

  study(): string {
    this._intelligence += 10;
    this._mental += 15;
    return "라떼는 말이야.. 이 정도 군대 정신력으로 버텼어.";
  }

  takeExam(): string {
    if (this.mental > this.intelligence) {
      this._intelligence += 25;
      this._points += 1;
      return "여유로운 멘탈로 답안지를 여유롭게 채웠다. 이건 고득점 각!";
    }
    this._intelligence += 10;
    if (Math.random() < 0.5) {
      this._points += 1;
      return "문법이 헷갈리긴 했는데... 운이 따라줬나? 일단 통과!";
    }
    return "아... 군대 있는 사이에 이 문법은 새로 나온 건가? 당황스럽네.";
  }
}
