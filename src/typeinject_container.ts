import { createInjector } from "typed-inject";

interface CourseInterface {
    selectCourse(): void

}

class DifferentialEquations implements CourseInterface {
    public static inject = ['shift'] as const;

    constructor(private shift: ShiftInterface) { }
    selectCourse() {
        console.log(`The DifferentialEquations was selected`)
        this.shift.selectShift()

    }


}

class DataStructure implements CourseInterface {
    public static inject = ['shift'] as const;

    constructor(private shift: ShiftInterface) { }
    selectCourse() {
        console.log(`The data structure was selected`)
        this.shift.selectShift()
    }


}
interface TeacherInterface {
    selectTeacher(): void
}

class Rezayi implements TeacherInterface {
    public static inject = [] as const;

    selectTeacher() {
        console.log(`I prefer to take this lesson with Dr. Rezaei`)
    }

}

class Alavi implements TeacherInterface {
    public static inject = [] as const;

    selectTeacher() {
        console.log(`I prefer to take this lesson with Dr. Alavi`)
    }


}

interface ShiftInterface {
    selectShift(): void;

}

class FirstShift implements ShiftInterface {
    public static inject = ['teacher'] as const;

    constructor(private teacher: TeacherInterface) { }
    selectShift() {
        console.log(`The first shift was considered.`)
        this.teacher.selectTeacher()
    }
}
class SecondShift implements ShiftInterface {
    public static inject = ['teacher'] as const;

    constructor(private teacher: TeacherInterface) { }
    selectShift() {
        console.log(`The second shift was considered.`)
        this.teacher.selectTeacher()

    }
}

class Student {
    public static inject = ['course'] as const;

    constructor(private course: CourseInterface) { }
    UnitSelection() {
        console.log(`I intend to choose a unit for the new semester of university`)
        this.course.selectCourse()
        console.log(`Unit selection completed successfully...`)

    }
}
export function diConstructor() {
    let student = new Student(new DataStructure(new SecondShift(new Alavi())));
    student.UnitSelection();
}

export function typeInjectContainer() {
    const appInjector = createInjector()
        .provideClass("teacher", Alavi)
        .provideClass("shift", SecondShift)
        .provideClass("course", DataStructure)
        .provideClass("student", Student);

    const student = appInjector.resolve("student");
    student.UnitSelection();
}

