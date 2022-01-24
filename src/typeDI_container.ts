import 'reflect-metadata'
import { Container, Service, Inject } from 'typedi';
interface CourseInterface {
    selectCourse(): void

}
@Service('DifferentialEquations')
class DifferentialEquations implements CourseInterface {
    @Inject('SecondShift')
    shift: ShiftInterface
    selectCourse() {
        console.log(`The DifferentialEquations was selected`)
        this.shift.selectShift()

    }


}
@Service('DataStructure')
class DataStructure implements CourseInterface {
    @Inject('SecondShift')
    shift: ShiftInterface
    selectCourse() {
        console.log(`The data structure was selected`)
        this.shift.selectShift()
    }


}
interface TeacherInterface {
    selectTeacher(): void
}
@Service('Rezayi')
class Rezayi implements TeacherInterface {
    selectTeacher() {
        console.log(`I prefer to take this lesson with Dr. Rezaei`)
    }

}
@Service('Alavi')
class Alavi implements TeacherInterface {
    selectTeacher() {
        console.log(`I prefer to take this lesson with Dr. Alavi`)
    }
}
interface ShiftInterface {
    selectShift(): void;

}
@Service('FirstShift')
class FirstShift implements ShiftInterface {
    @Inject('Alavi')
    teacher: TeacherInterface
    selectShift() {
        console.log(`The first shift was considered.`)
        this.teacher.selectTeacher()
    }
}
@Service('SecondShift')
class SecondShift implements ShiftInterface {
    @Inject('Alavi')
    teacher: TeacherInterface
    selectShift() {
        console.log(`The second shift was considered.`)
        this.teacher.selectTeacher()

    }
}
@Service()
class Student {
    @Inject('DataStructure')
    course: CourseInterface
    UnitSelection() {
        console.log(`I intend to choose a unit for the new semester of university`)
        this.course.selectCourse()
        console.log(`Unit selection completed successfully...`)

    }
}
// export function diConstructor() {
//     let student = new Student(new DataStructure(new SecondShift(new Alavi())));
//     student.UnitSelection();
// }

export function typeDIContainer() {
    let student = Container.get(Student);

    student.UnitSelection();


    // const appInjector = createInjector()
    //     .provideClass("teacher", Alavi)
    //     .provideClass("shift", SecondShift)
    //     .provideClass("course", DataStructure)
    //     .provideClass("student", Student);

    // const student = appInjector.resolve("student");
    // student.UnitSelection();
}

