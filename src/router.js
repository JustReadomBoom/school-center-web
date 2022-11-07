import Student from './components/student/Student.vue'
import Login from './components/Login.vue'
import Classes from './components/class/Class.vue'

export default [
    {path: "/", component: Login},
    {path: "/student", component: Student},
    {path: "/classess", component: Classes}

]


