import { SongTimePipe } from "./song-time.pipe";

describe("SongTimePipe", () => {
  const pipe = new SongTimePipe();
  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should produce string of format mm:ss for time under 60 minutes", () => {
    expect(pipe.transform(60)).toMatch(/^\d{2}:\d{2}$/);
  });

  it("should produce 00:00 for 0", () => {
    expect(pipe.transform(0)).toBe("00:00");
  });

  it("should produce 59:59 for 3599", () => {
    expect(pipe.transform(3599)).toBe("59:59");
  });

  it("should produce 00:00 for negative values", () => {
    expect(pipe.transform(-1)).toBe("00:00");
  });

  it("should show hours for long times", () => {
    expect(pipe.transform(6300)).toBe("01:45:00");
  });

  it("should clip the time at 99 hours for extra long times", () => {
    expect(pipe.transform(9999999).slice(0, 3)).toBe("99:");
  });

  describe("in millis mode", () => {
    it("should produce 59:59 for value 3599000", () => {
      expect(pipe.transform(3599000, "millis")).toBe("59:59");
    });

    it("should produce 00:00 for 0", () => {
      expect(pipe.transform(0, "millis")).toBe("00:00");
    });
  });
});
