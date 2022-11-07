<template>
    <div>

        <div class="login" style="">
            <el-row>

                <div class="login_container">

                    <div class="login_box">
                        <el-form :rules="rules" :model="form" ref="loginFormRef" :status-icon="true">

                            <el-form-item prop="username">
                                <el-input prefix-icon="el-icon-user-solid" placeholder="账号"
                                          v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" prefix-icon="el-icon-lock" placeholder="密码"
                                          v-model="form.password"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button class="btns" type="primary" @click="submitLogin">登录</el-button>
                                <el-button class="btns" type="primary" @click="resetLoginForm">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>


            </el-row>
        </div>
    </div>

</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                    title: ""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                url: '/user/login'
            }
        },
        methods: {

            submitLogin() {
                this.$http.post("http://localhost:8521/user/login",
                    {
                        userName: this.form.username,
                        password: this.form.password
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.$router.push({path: '/student'});
                        this.Cook.set("userName", this.form.username);
                    } else {
                        this.$message(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });

            },
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields()
            }
        }
    }
</script>
<style scoped>
    .font {
        filter: Shadow(Color=green, Direction=135);
        position: absolute;
        font-size: 14pt;
        font-weight: bolder;
        left: 350px;
        top: 20px;
        font-size: 50px;
        color: #aa8383;
        position: relative;
        left: 16%;
        top: 20%;
    }

    .login {
        height: 600px;
    }

    .login_container {
        height: 100px;
        margin: 200px;
        margin-left: 40%;
        padding: 10px;
        width: 300px;
        height: 200px;
        background: rgb(33, 29, 39);

        border-radius: 10px;
    }

    .btns {
        margin-left: 2%;
        width: 45%;
        background: rgb(102, 122, 134);

    }

</style>