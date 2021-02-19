const students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85
    },
    {
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 90
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100
    },
    {
        name: "Helen",
        age: 20,
        isMarried: false,
        scores: 110
    },
    {
        name: "Ann",
        age: 20,
        isMarried: false,
        scores: 105
    },
];

const user = {
    name: "Bob",
    age: 23,
    friends: ["Alex", "Nick", "John"]
}

//1. Создайте поверхностную копию объекта user
const copyUser = {...user}

//Проверка:
console.log(user === copyUser) // false
console.log(user.friends === copyUser.friends) // true


//2. Полная (глубокая) копия объекта user
const deepCopyUser = {...user, friends: [...user.friends]} 

//Проверка:
console.log(user === deepCopyUser) // false
console.log(user.friends === deepCopyUser.friends) // false


//3. Поверхностная копия массива students
const copyStudents = [...students]

//Проверка:
console.log(students === copyStudents) // false
console.log(students[0] === copyStudents[0]) // true


//4. Полная (глубокая) копия массива students

 const shallowCopyStudents = [...students]
 const deepCopyStudents = shallowCopyStudents.map((st) => ({...st})) 

//Проверка:
console.log(students === deepCopyStudents) // false
console.log(students[0] === deepCopyStudents[0]) // false



// NB!!! Далее все преобразования выполняем не модифицируя исходный массив students
// Вывод результатов - в консоль

//5. Отсортируйте deepCopyStudents по алфавиту 

deepCopyStudents.sort((a, b) => {
    if(a.name < b.name){
        return -1
    } else{
        return 1
    }
})
console.log(deepCopyStudents)


//5a. Отсортируйте deepCopyStudents по успеваемости(лучший идёт первым)

deepCopyStudents.sort((a, b) => b.scores - a.scores)
console.log(deepCopyStudents)


//6. Сформируйте массив студентов, у которых 100 и более баллов 

const bestStudents = deepCopyStudents.filter((st) => st.scores >= 100)
console.log(bestStudents)


//6a."Вырежьте" трёх лучших студентов из массива deepCopyStudents 

const topStudents = deepCopyStudents.splice(0, 3)
console.log(topStudents)
console.log(deepCopyStudents)


//6b. Объедините массивы deepCopyStudents и topStudents так,
// чтоб сохранился порядок сортировки 
const newDeepCopyStudents = [...topStudents, ...deepCopyStudents]
console.log(newDeepCopyStudents)


//7. Сформируйте массив холостых студентов 

const notMarriedStudents = newDeepCopyStudents.filter((st) => !st.isMarried)
console.log(notMarriedStudents)


//8. Сформируйте массив имён студентов 

const studentsNames = newDeepCopyStudents.map((st) => st.name)
console.log(studentsNames)


//8a. Сформируйте строку из имён студентов, разделённых
// - запятой 
// - пробелом 

const nameWithSpace = studentsNames.join(' ')
console.log(nameWithSpace)
const namesWithComma = studentsNames.join(',')
console.log(namesWithComma)


//9. Добавьте всем студентам свойство "isStudent" со значением true 

const trueStudents = newDeepCopyStudents.map((st) => ({...st, isStudent: true}))
console.log(trueStudents)


//10. Nick женился. Выполните выполните соответствующие преобразование массива students 

const studentsWithMarriedNick = trueStudents.map((st) => {
    if(st.name === 'Nick'){
        return {...st, isMarried: true}
    }
    return st
})
console.log(studentsWithMarriedNick)


//11. Найдите студента по имени Ann 

const ann = newDeepCopyStudents.find((st) => st.name === 'Ann')
console.log(ann)

//12. Найдите студента с самым высоким баллом

const bestStudent = newDeepCopyStudents.reduce((acc, el) => {
    if(el.scores > acc.scores){
        acc = el
    }

    return acc
})
console.log(bestStudent)


//13. Найдите сумму баллов всех студентов 

const scoresSum = newDeepCopyStudents.reduce((acc, el) => acc + el.scores, 0)
console.log(scoresSum)


// 14.Напишите функцию addFriends, которая принимает параметром массив students
// и добавляет в каждому студенту свойство friends,
// значением которого является массив имён всех остальных студентов из массива,
// за исключением собственного имени студента. Т.е. в друзьях у Боба Боба быть не должно.

const addFriends = (students) => {
    const withFriends = students.map((studentObj) =>{
        const studentFriends = students.filter((st) => studentObj.name !== st.name)
        return {...studentObj, friends: studentFriends}
    })

    return withFriends
}

console.log(addFriends(students))
