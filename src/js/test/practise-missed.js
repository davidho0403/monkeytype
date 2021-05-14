import * as TestStats from "./test-stats";
import * as Notifications from "./notifications";
import Config, * as UpdateConfig from "./config";
import * as CustomText from "./custom-text";
import * as TestLogic from "./test-logic";

export let before = {
  mode: null,
  punctuation: null,
  numbers: null,
};

export function init() {
  if (Object.keys(TestStats.missedWords).length == 0) {
    Notifications.add("You haven't missed any words.", 0);
    return;
  }
  before = {
    mode: null,
    punctuation: null,
    numbers: null,
  };
  let mode = Config.mode;
  let punctuation = Config.punctuation;
  let numbers = Config.numbers;
  UpdateConfig.setMode("custom");
  let newCustomText = [];
  Object.keys(TestStats.missedWords).forEach((missedWord) => {
    for (let i = 0; i < TestStats.missedWords[missedWord]; i++) {
      newCustomText.push(missedWord);
    }
  });
  CustomText.setText(newCustomText);
  CustomText.setIsWordRandom(true);
  CustomText.setWord(Object.keys(TestStats.missedWords).length * 5);

  TestLogic.restart();
  before.mode = mode;
  before.punctuation = punctuation;
  before.numbers = numbers;
}

export function resetBefore() {
  before.mode = null;
  before.punctuation = null;
  before.numbers = null;
}
