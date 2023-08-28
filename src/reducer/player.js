export const intialPlayerState = {
  subtitle:
    '화면의 사각형 영역에 전신이 들어오도록 카메라를 조정해주세요. 준비되면 "시작하기" 버튼을 누르세요.',
  guideStatus: false,
  countdown: null,
  playButtonActive: true,
  guideButtonActive: false,
  complete: false,
};

export function playerReducer(state, action) {
  switch (action.type) {
    case "playGuide":
      return {
        ...state,
        guideStatus: true,
      };
    case "stopGuide":
      return {
        ...state,
        guideStatus: false,
      };
    case "complete":
      return {
        ...state,
        complete: true,
      };
    case "setSubtitle":
      return {
        ...state,
        subtitle: action.payload,
      };
    case "setCountdown":
      return {
        ...state,
        countdown: action.payload,
      };
    case "setPlayButton":
      return {
        ...state,
        playButtonActive: action.payload,
      };
    case "setGuideButton":
      return {
        ...state,
        guideButtonActive: action.payload,
      };
    default:
      console.error("[PlayerReducer] Undefined action: " + action.type);
      return state;
  }
}
