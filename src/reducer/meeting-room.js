export const intialMeetingRoomState = {
  cameraStatus: null,
};

export function meetingRoomReducer(state, action) {
  switch (action.type) {
    case "setCameraStatus":
      return {
        ...state,
        cameraStatus: action.payload,
      };
    default:
      console.error("[MeetingRoomReducer] Undefined action: " + action.type);
      return state;
  }
}
