import { describe, expect, it } from "bun:test";
import { createRockstarFaker } from "../index.js";

describe("education module", () => {
  it("produces stable courses for a fixed seed", () => {
    const a = createRockstarFaker({ locale: "da", seed: 42 });
    const b = createRockstarFaker({ locale: "da", seed: 42 });
    expect(a.education.courses(3)).toEqual(b.education.courses(3));
  });

  it("includes instructor and subject on each course", () => {
    const faker = createRockstarFaker({ locale: "da", seed: 1 });
    const [course] = faker.education.courses(1);
    expect(course.instructor.length).toBeGreaterThan(0);
    expect(course.subject.length).toBeGreaterThan(0);
    expect(course.id).toBe("course-1");
  });
});
