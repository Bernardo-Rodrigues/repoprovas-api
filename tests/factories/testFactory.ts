import { Category, Discipline, Teacher, TeacherDiscipline, Term, Test } from ".prisma/client";
import { faker } from "@faker-js/faker";
import path from "path"

interface SeedElements {
    term: Term;
    teacher: Teacher;
    discipline: Discipline;
    teacherDiscipline: TeacherDiscipline;
    category: Category;
    test: Test
}

export function createTest (seedElements: SeedElements) {
    return {
        name: faker.lorem.words(2),
        category: seedElements.category.name,
        teacher: seedElements.teacher.name,
        discipline: seedElements.discipline.name,
        pdf: path.resolve("./tests/factories", "teste.pdf")
    }
} 