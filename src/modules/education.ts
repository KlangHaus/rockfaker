import type { Engine } from "../core/engine.js";
import type { RockstarLocale } from "../core/types.js";
import { PersonModule } from "./person.js";

export interface CourseFixture {
  id: string;
  slug: string;
  title: string;
  moduleTitle: string;
  subject: string;
  instructor: string;
}

export class EducationModule {
  private person: PersonModule;

  constructor(
    private engine: Engine,
    private locale: RockstarLocale,
  ) {
    this.person = new PersonModule(engine, locale);
  }

  courseTitle(): string {
    return this.engine.pickFrom(this.locale.education.courseTitle);
  }

  moduleTitle(): string {
    return this.engine.pickFrom(this.locale.education.moduleTitle);
  }

  subject(): string {
    return this.engine.pickFrom(this.locale.education.subject);
  }

  course(index: number): CourseFixture {
    const ordinal = index + 1;
    return {
      id: `course-${ordinal}`,
      slug: `course-${ordinal}`,
      title: this.courseTitle(),
      moduleTitle: this.moduleTitle(),
      subject: this.subject(),
      instructor: this.person.fullName(),
    };
  }

  courses(count: number): CourseFixture[] {
    return Array.from({ length: count }, (_, index) => this.course(index));
  }
}
