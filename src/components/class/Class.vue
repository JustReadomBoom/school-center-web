<template>
    <div id="class">
        <form-dialog
                :rules="rules"
                :dialogFormVisible="dialogFormVisible"
                :title="formEditType"
                :searchData="authGroupForm"
                :searchForm="searchForm"
                :name="names"
                @validateTrue="validateTrue"
                @validateFalse="validateFalse"
                @closeDialogFunc="closeDialog"

        ></form-dialog>
        <div class="bar">
            <el-row class="user">
                <el-tag class="alert" style="color: rgb(64, 94, 114);" size="medium">登录用戶：{{this.Cook.get("userName")}}</el-tag>
                <el-button class="badge" size="mini" type="info" @click="LogOut()">退出</el-button>
            </el-row>

            <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
                <span style="color: black">班主任姓名：</span>
                <el-input class="in" v-model="chargeTeacher">
                </el-input>
                <span style="color: black">班级：</span>
                <el-input class="in" v-model="classCode">
                </el-input>

                <el-button class="btn" size="small" type="primary" icon="el-icon-search" @click="searchClick()">搜索
                </el-button>
            </div>

            <el-row class="guanli">
                <el-row style="margin-top:30px;">
                    <el-button class="btn" size="mini" type="primary" @click="handleStudent()">学生管理</el-button>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-button class="btn" disabled=true size="mini" type="primary" @click="handleclassess()">班级管理
                    </el-button>
                </el-row>


            </el-row>
        </div>
        <el-row style="margin-top:20px;margin-left:10%;">
            <el-button class="btn" size="mini" type="primary" @click="handleAdd()">添加</el-button>
        </el-row>
        <el-row class="row alert alert-info" style="height: 80%;">


            <el-table class="table table-striped" :data="classList" style="width: 100%">

                <el-table-column label="班级编号" :span="8">
                    <template slot-scope="scope">
                        <span>{{ scope.row.classCode }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="班级名称" :span="8">
                    <template slot-scope="scope">
                        <span>{{ scope.row.className }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="班主任姓名" :span="8">
                    <template slot-scope="scope">
                        <span>{{ scope.row.chargeTeacher }}</span>
                    </template>
                </el-table-column>


                <el-table-column prop="mit" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>

                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">刪除</el-button>
                    </template>
                </el-table-column>


            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                    class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"

                    layout=" prev, pager, next"
                    :total="total">
            </el-pagination>
        </el-row>

    </div>
</template>

<script>

    import FormDialog from '../entry/Dialog'


    export default {
        name: 'classesss',
        components: {

            FormDialog
        },
        data() {
            return {
                name: "搜索...",
                username: '',
                classList: [],
                classInfos: [],
                chargeTeacher:"",
                classCode: "",
                keywords: "",
                dialogFormVisible: false,
                formEditType: 'add',
                currentPage: 1,
                pagesize: 10,
                total: 1,
                authGroupForm: {
                    id: '',
                    classCode: '',
                    className: '',
                    chargeTeacher: '',


                },
                searchForm: [
                    {
                        type: "Input",
                        label: "班级编号",
                        prop: "classCode",
                        width: "120px",
                        disabled: false,
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "班级名称",
                        prop: "className",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "班主任姓名",
                        prop: "chargeTeacher",
                        width: "120px",
                        isFormItemShow: true
                    },
                ],

                rules: {
                    classCode: [
                        {required: true, message: "请输入班级编号", trigger: "blur"}
                    ],
                    className: [
                        {required: true, message: "请输入班级名称", trigger: "blur"}
                    ],
                    chargeTeacher: [{required: false, message: "请输入班主任姓名", trigger: "blur"}],

                }
            }
        },
        created() {
            // if (this.username = this.$route.query.username) {
            //     this.Cook.set("username", this.username);
            // } else {
            //     this.username = this.Cook.get("username");
            // }


        },
        mounted() {
            this.handleCurrentChange(this.currentPage);
            this.pagesize = this.total % this.currentPage
        },
        methods: {
            validateTrue(searchData) {
                console.log("searchData", searchData)
                if (this.formEditType === "edit") {
                    this.editClassList(searchData);
                } else if (this.formEditType === "add") {
                    this.addClass(searchData);
                }
                this.dialogFormVisible = false;
            },

            validateFalse() {
                this.dialogFormVisible = true;
            },

            closeDialog(newDialogFormVisible) {

                this.dialogFormVisible = newDialogFormVisible;
            },

            editClassList(searchData) {
                this.$http.post("http://localhost:8521/class/update",
                    {
                        id: searchData.id,
                        classCode: searchData.classCode,
                        className: searchData.className,
                        chargeTeacher: searchData.chargeTeacher
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.$message(resp.data.msg);
                        this.handleCurrentChange(this.currentPage);
                    } else {
                        this.$message(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            },

            addClass(searchData) {
                this.$http.post("http://localhost:8521/class/add",
                    {
                        classCode: searchData.classCode,
                        className: searchData.className,
                        chargeTeacher: searchData.chargeTeacher
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.$message.success(resp.data.message);
                        this.handleCurrentChange(this.currentPage);
                    } else {
                        this.$message(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            },


            handleSizeChange: function (size) {
                this.pagesize = size;
                console.info(size)
            },

            handleCurrentChange: function (currentPage) {
                this.$http.post("http://localhost:8521/class/queryPage",
                    {
                        currentPage: currentPage,
                        pageSize: 10,
                        name: this.name,
                        code: this.code,
                        classCode: this.classCode
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.classList = resp.data.data.classInfos;
                        this.total = resp.data.data.total
                    } else {
                        this.$message(resp.data.msg)
                        this.classList = [];
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            },

            handleStudent() {
                this.$router.push({path: '/student', query: {}});
            },

            searchClick() {
                this.$http.post("http://localhost:8521/class/queryPage",
                    {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        classCode: this.classCode,
                        className: this.className,
                        chargeTeacher: this.chargeTeacher
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.classList = resp.data.data.classInfos;
                        this.total = resp.data.data.total
                    } else {
                        this.$message(resp.data.msg)
                        this.classList = [];
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            },

            handleEdit(searchData) {
                this.authGroupForm.id = searchData.id;
                this.authGroupForm.classCode = searchData.classCode,
                    this.authGroupForm.className = searchData.className,
                    this.authGroupForm.chargeTeacher = searchData.chargeTeacher,
                    this.dialogFormVisible = !this.dialogFormVisible;
                this.formEditType = 'edit';
                this.searchForm[0].disabled = true;


            },

            LogOut() {
                this.$message.success("登出成功")
                this.Cook.set("userName", null);
                this.$router.push({path: '/', query: {}});
            },

            handleAdd() {
                this.dialogFormVisible = !this.dialogFormVisible;
                this.formEditType = 'add';
                this.searchForm[0].disabled = false;

            },

            handleDelete(id) {
                this.$http.get("http://localhost:8521/class/deleteById?id=" + id,
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    this.$message(resp.data.msg);
                    if (code === '0000') {
                        this.handleCurrentChange(this.currentPage);
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            }
        }
    }

</script>
<style scoped>
    * {
        font-size: 0.2vw;


    }

    #class {

        margin-left: 5%;
        width: 90%;


    }

    .row {
        width: 80%;
        margin-left: 10%;
    }

    .guanli {
        width: 20%;
        position: absolute;
        margin-right: 40px;

    }

    .pagination {

        width: 30%;
        margin-left: 10%;
        margin-bottom: 20px;
        color: rgb(64, 94, 114);

    }

    .btn {
        background: rgb(64, 94, 114);
    }

    .user {

        float: left;
        margin-right: 100px;
    }

    .in {
        float: left;
        width: 20%;

    }

    .bar {
        width: 80%;
    }
</style>