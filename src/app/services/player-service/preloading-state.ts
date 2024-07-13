export enum PreloadingState {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed",
}

export interface PreloadingStateRecord {
  state: PreloadingState;
  timestamp: Date;
}
