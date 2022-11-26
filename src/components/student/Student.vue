<template>
    <div id="student">
        <form-dialog
                :rules="rules"
                :dialogFormVisible="dialogFormVisible"
                :title="formEditType"
                :searchData="authgroupForm"
                :searchForm="searchForm"
                :name="names"
                @validateTrue="validateTrue"
                @validateFalse="validateFalse"
                @closeDialogFunc="closeDialog"

        ></form-dialog>
        <div class="bar">
            <el-row class="user">
                <el-tag class="alert" style="color: rgb(64, 94, 114);" size="medium">
                    登录用戶：{{this.Cook.get("userName")}}
                </el-tag>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button class="badge" size="mini" type="info" @click="LogOut()">退出</el-button>
            </el-row>

            <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
                <span style="color: black">姓名：</span>
                <el-input class="in" v-model="name">
                </el-input>
                <!--<span style="color: black">学号：</span>-->
                <!--<el-input class="in" v-model="code">-->
                <!--</el-input>-->
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button class="btn" size="small" type="primary" icon="el-icon-search" @click="searchClick()">搜索
                </el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-upload :action=uploadDataUrl
                           :show-file-list="false"
                           :before-upload="beforeUpload"
                           :on-success="uploadSuccess3 = (res, file) => {uploadExcelSuccess(res, file)}">
                    <el-button size="small" type="primary" icon="el-icon-upload">上传</el-button>
                </el-upload>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button size="small" type="warning" icon="el-icon-download" @click="downloadData()">下载
                </el-button>
            </div>


            <el-row class="guanli">
                <el-row style="margin-top:30px;">
                    <el-button class="btn" disabled=true size="mini" type="primary" @click="handleStudent()">学生管理
                    </el-button>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-button class="btn" :disabled="seen" size="mini" type="primary" @click="handleClasses()">班级管理
                    </el-button>
                </el-row>


            </el-row>
        </div>
        <el-row style="margin-top:20px;margin-left:10%;">
            <el-button class="btn" size="mini" type="primary" @click="handleAdd()">添加</el-button>
        </el-row>
        <el-row class="row alert alert-info" style="height: 80%;">
            <el-table class="table table-striped" :data="students" style="width: 100%">
                <el-table-column label="学号" width="70">
                    <template slot-scope="scope">
                        <span>{{ scope.row.code }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="姓名" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="头像" width="120">
                    <template slot-scope="scope">
                        <el-upload :action=uploadImgUrl
                                   :show-file-list="false"
                                   :before-upload="beforeUpload"
                                   :on-success="uploadSuccess2 = (res, file) => {uploadSuccess(res, file, scope.row)}"
                                   :data="{id: scope.row.id}"
                                   accept="image/*">
                            <el-button type="primary" icon="el-icon-upload2" v-show="!scope.row.photo"
                                       plain></el-button>
                            <img v-show="scope.row.photo" :src="scope.row.photo" style="width: 70px;height: 70px">
                        </el-upload>
                    </template>
                </el-table-column>

                <el-table-column label="身份证号" width="140">
                    <template slot-scope="scope">
                        <span>{{ scope.row.idNo }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="性别" width="70">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="年龄" width="70">
                    <template slot-scope="scope">
                        <span>{{ scope.row.age }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="班级" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.className }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="爸爸姓名" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fatherName }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="爸爸手机号" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fatherPhone }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="爸爸身份证号" width="140">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fatherIdNo }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="爸爸工作单位" width="230">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fatherJob }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="妈妈姓名" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.motherName }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="妈妈手机号" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.motherPhone }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="妈妈身份证号" width="140">
                    <template slot-scope="scope">
                        <span>{{ scope.row.motherIdNo }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="妈妈工作单位" width="230">
                    <template slot-scope="scope">
                        <span>{{ scope.row.motherJob }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="家庭地址" width="330">
                    <template slot-scope="scope">
                        <span>{{ scope.row.homeAddress }}</span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                        <el-button type="success" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">刪除</el-button>-->
                        <el-button size="mini" type="danger" @click="beforeDelete(scope.row.id)">刪除</el-button>
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


        <el-dialog title="提示" :visible.sync="dialogVisible" width="270px">
            <span style="color: red; font-size: medium;">确定删除该学生吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDelete(deleteId)">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>

    import FormDialog from '../entry/Dialog'
    import 'bootstrap/dist/css/bootstrap.min.css'


    export default {
        name: 'Students',
        components: {

            FormDialog
        },
        data() {
            return {
                id: "",
                code: "",
                name: "",
                idNo: "",
                classCode: "",
                className: "",
                age: 0,
                sex: 0,
                photo: "",
                fatherName: "",
                fatherPhone: "",
                fatherJob: "",
                fatherIdNo: "",
                motherName: "",
                motherPhone: "",
                motherJob: "",
                motherIdNo: "",
                homeAddress: "",

                dialogVisible: false,
                deleteId: "",

                names: "请输入学号进行搜索...",
                seen: false,
                userName: '',
                students: [],
                keywords: "",

                dialogFormVisible: false,
                formEditType: 'add',
                uploadImgUrl: "http://localhost:8521/student/uploadImg",
                uploadDataUrl: "http://localhost:8521/student/importData",

                classList: [],
                currentPage: 1,
                pagesize: 10,
                total: 0,
                authgroupForm: {
                    id: "",
                    code: "",
                    name: "",
                    idNo: "",
                    classCode: "",
                    className: "",
                    age: "",
                    sex: "",
                    photo: "",
                    height: "",
                    fatherName: "",
                    fatherPhone: "",
                    fatherJob: "",
                    fatherIdNo: "",
                    motherName: "",
                    motherPhone: "",
                    motherJob: "",
                    motherIdNo: "",
                    homeAddress: "",

                },
                searchForm: [
                    {
                        type: "Input",
                        label: "学号",
                        prop: "code",
                        width: "120px",
                        disabled: false,
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "姓名",
                        prop: "name",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "身份证号",
                        prop: "idNo",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Select",
                        label: "性别",
                        prop: "sex",
                        width: "120px",
                        props: [
                            {
                                className: "男",
                                classCode: "0"
                            },
                            {
                                className: "女",
                                classCode: "1"
                            }
                        ],
                        change: row => {
                        },
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "年龄",
                        prop: "age",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Select",
                        label: "班级",
                        prop: "classCode",
                        width: "120px",
                        props: this.classList,
                        change: row => {


                        },
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "爸爸姓名",
                        prop: "fatherName",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "爸爸手机号",
                        prop: "fatherPhone",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "爸爸身份证号",
                        prop: "fatherIdNo",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "爸爸工作单位",
                        prop: "fatherJob",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "妈妈姓名",
                        prop: "motherName",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "妈妈手机号",
                        prop: "motherPhone",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "妈妈身份证号",
                        prop: "motherIdNo",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "妈妈工作单位",
                        prop: "motherJob",
                        width: "120px",
                        isFormItemShow: true
                    },
                    {
                        type: "Input",
                        label: "家庭地址",
                        prop: "homeAddress",
                        width: "120px",
                        isFormItemShow: true
                    }


                ],
                rules: {
                    code: [
                        {required: true, message: "请填写学生学号", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请填写学生姓名", trigger: "blur"},
                        {max: 5, min: 1, message: "请填正确的姓名", trigger: "blur"}
                    ],
                    idNo: [
                        {required: true, message: "请填写身份证号", trigger: "blur"},
                        {
                            pattern: "^[1-9]\\d{5}(18|19|20|(3\\d))\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
                            message: "请输入正确的身份证号",
                            trigger: "blur"
                        }
                    ],
                    sex: [
                        {required: true, message: "请选择学生性别", trigger: "blur"}
                    ],
                    age: [
                        {required: true, message: "请填写年龄", trigger: "blur"},
                        {pattern: "^(0|[1-9][0-9]*)$", message: "年龄格式错误", trigger: "blur"}
                    ],
                    fatherName: [
                        {required: true, message: "请填写爸爸姓名", trigger: "blur"}
                    ],
                    fatherPhone: [
                        {required: true, message: "请填写爸爸手机号码", trigger: "blur"},
                        {
                            pattern: "^1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$",
                            message: "请输入正确的手机号",
                            trigger: "blur"
                        }
                    ],
                    classCode: [
                        {required: true, message: "请选择班级", trigger: "blur"}
                    ],
                    motherName: [
                        {required: true, message: "请填写妈妈姓名", trigger: "blur"}
                    ],
                    motherPhone: [
                        {required: true, message: "请填写妈妈手机号码", trigger: "blur"},
                        {
                            pattern: "^1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$",
                            message: "请输入正确的手机号",
                            trigger: "blur"
                        }
                    ],
                    fatherJob: [
                        {required: true, message: "请填写爸爸的工作", trigger: "blur"}
                    ],
                    motherJob: [
                        {required: true, message: "请填写妈妈的工作", trigger: "blur"}
                    ],
                    homeAddress: [
                        {required: true, message: "请填写家庭地址", trigger: "blur"}
                    ],
                    fatherIdNo: [
                        {required: true, message: "请填写爸爸的身份证号", trigger: "blur"},
                        {
                            pattern: "^[1-9]\\d{5}(18|19|20|(3\\d))\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
                            message: "请输入正确的身份证号",
                            trigger: "blur"
                        }
                    ],
                    motherIdNo: [
                        {required: true, message: "请填写妈妈的身份证号", trigger: "blur"},
                        {
                            pattern: "^[1-9]\\d{5}(18|19|20|(3\\d))\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
                            message: "请输入正确的身份证号",
                            trigger: "blur"
                        }
                    ]


                },
            }
        },

        created() {
            this.getClassesList();
        },

        mounted() {
            this.handleCurrentChange(this.currentPage);
            this.pagesize = this.total % this.currentPage

        },

        methods: {
            beforeUpload(file) {

            },

            uploadSuccess(res, file, row) {
                row.photo = res.data && res.data.photo;
                this.handleCurrentChange(this.currentPage);
            },

            uploadExcelSuccess(res, file) {
                let code = res.code;
                let msg = res.msg;
                if (code === '0000') {
                    this.$message.success(msg);
                    this.handleCurrentChange(this.currentPage);
                } else {
                    this.$message.error(msg);
                }
            },


            getClassesList() {
                this.$http.get("http://localhost:8521/class/queryClassList",
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.classList = resp.data.data.classList;
                        this.searchForm[5].props = this.classList;
                    } else {
                        this.$message.warning(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                });
            },

            validateTrue(searchData) {
                console.log("searchData=", JSON.stringify(searchData))
                if (this.formEditType === "edit") {
                    this.editStudents(searchData);
                } else if (this.formEditType === "add") {
                    this.addStudents(searchData);
                }
                this.dialogFormVisible = false;
            },

            validateFalse() {
                this.dialogFormVisible = true;
            },

            closeDialog(newDialogFormVisible) {
                this.dialogFormVisible = newDialogFormVisible;
            },

            editStudents(searchData) {
                this.$http.post("http://localhost:8521/student/update",
                    {
                        id: searchData.id,
                        code: searchData.code,
                        name: searchData.name,
                        idNo: searchData.idNo,
                        classCode: searchData.classCode,
                        sex: searchData.sex,
                        age: searchData.age,
                        fatherName: searchData.fatherName,
                        fatherPhone: searchData.fatherPhone,
                        fatherJob: searchData.fatherJob,
                        motherName: searchData.motherName,
                        motherPhone: searchData.motherPhone,
                        motherJob: searchData.motherJob,
                        homeAddress: searchData.homeAddress,
                        fatherIdNo: searchData.fatherIdNo,
                        motherIdNo: searchData.motherIdNo
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.$message.success(resp.data.msg);
                        this.handleCurrentChange(this.currentPage);
                    } else {
                        this.$message.warning(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                });
            },

            addStudents(searchData) {
                this.$http.post("http://localhost:8521/student/add",
                    {
                        code: searchData.code,
                        name: searchData.name,
                        idNo: searchData.idNo,
                        classCode: searchData.classCode,
                        sex: searchData.sex == '男' ? 1 : 2,
                        age: searchData.age,
                        fatherName: searchData.fatherName,
                        fatherPhone: searchData.fatherPhone,
                        fatherJob: searchData.fatherJob,
                        motherName: searchData.motherName,
                        motherPhone: searchData.motherPhone,
                        motherJob: searchData.motherJob,
                        homeAddress: searchData.homeAddress,
                        fatherIdNo: searchData.fatherIdNo,
                        motherIdNo: searchData.motherIdNo
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.$message.success(resp.data.msg);
                        this.handleCurrentChange(this.currentPage);
                    } else {
                        this.$message.warning(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                });
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
                console.info(size)
            },

            searchClick() {
                this.$http.post("http://localhost:8521/student/queryPage",
                    {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        name: this.name
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.students = resp.data.data.students;
                        this.total = resp.data.data.total;
                    } else {
                        this.$message.warning(resp.data.msg);
                        this.students = [];
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                });
            },


            downloadData() {
                window.open("http://localhost:8521/student/downloadData");
            },

            handleCurrentChange: function (currentPage) {
                this.$http.post("http://localhost:8521/student/queryPage",
                    {
                        currentPage: currentPage,
                        pageSize: 10
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        this.students = resp.data.data.students;
                        this.total = resp.data.data.total;
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            },

            handleClasses() {
                this.$router.push({path: '/classess', query: {}});
            },

            handleAdd() {
                this.dialogFormVisible = !this.dialogFormVisible;
                this.formEditType = 'add';
                this.searchForm[0].disabled = false;

            },

            handleDetail(student) {
                this.authgroupForm.id = student.id,
                    this.authgroupForm.code = student.code,
                    this.authgroupForm.name = student.name,
                    this.authgroupForm.idNo = student.idNo,
                    this.authgroupForm.classCode = student.className,
                    this.authgroupForm.sex = student.sex = 1 ? "男" : "女",
                    this.authgroupForm.age = student.age,
                    this.authgroupForm.fatherName = student.fatherName,
                    this.authgroupForm.fatherPhone = student.fatherPhone,
                    this.authgroupForm.fatherJob = student.fatherJob,
                    this.authgroupForm.fatherIdNo = student.fatherIdNo,
                    this.authgroupForm.motherName = student.motherName,
                    this.authgroupForm.motherPhone = student.motherPhone,
                    this.authgroupForm.motherJob = student.motherJob,
                    this.authgroupForm.motherIdNo = student.motherIdNo,
                    this.authgroupForm.homeAddress = student.homeAddress,
                    this.dialogFormVisible = !this.dialogFormVisible;
                this.formEditType = 'detail';
                this.searchForm[0].disabled = true;
                this.searchForm[1].disabled = true;
                this.searchForm[2].disabled = true;
                this.searchForm[3].disabled = true;
                this.searchForm[4].disabled = true;
                this.searchForm[5].disabled = true;
                this.searchForm[6].disabled = true;
                this.searchForm[7].disabled = true;
                this.searchForm[8].disabled = true;
                this.searchForm[9].disabled = true;
                this.searchForm[10].disabled = true;
                this.searchForm[11].disabled = true;
                this.searchForm[12].disabled = true;
                this.searchForm[13].disabled = true;
                this.searchForm[14].disabled = true;
            },


            handleEdit(student) {
                this.searchForm[0].disabled = false;
                this.searchForm[1].disabled = false;
                this.searchForm[2].disabled = false;
                this.searchForm[3].disabled = false;
                this.searchForm[4].disabled = false;
                this.searchForm[5].disabled = false;
                this.searchForm[6].disabled = false;
                this.searchForm[7].disabled = false;
                this.searchForm[8].disabled = false;
                this.searchForm[9].disabled = false;
                this.searchForm[10].disabled = false;
                this.searchForm[11].disabled = false;
                this.searchForm[12].disabled = false;
                this.searchForm[13].disabled = false;
                this.searchForm[14].disabled = false;

                this.authgroupForm.id = student.id,
                    this.authgroupForm.code = student.code,
                    this.authgroupForm.name = student.name,
                    this.authgroupForm.idNo = student.idNo,
                    this.authgroupForm.classCode = student.className,
                    this.authgroupForm.sex = student.sex = 1 ? "男" : "女",
                    this.authgroupForm.age = student.age,
                    this.authgroupForm.fatherName = student.fatherName,
                    this.authgroupForm.fatherPhone = student.fatherPhone,
                    this.authgroupForm.fatherIdNo = student.fatherIdNo,
                    this.authgroupForm.fatherJob = student.fatherJob,
                    this.authgroupForm.motherName = student.motherName,
                    this.authgroupForm.motherPhone = student.motherPhone,
                    this.authgroupForm.motherJob = student.motherJob,
                    this.authgroupForm.motherIdNo = student.motherIdNo,
                    this.authgroupForm.homeAddress = student.homeAddress,
                    this.dialogFormVisible = !this.dialogFormVisible;
                this.formEditType = 'edit';
                this.searchForm[0].disabled = true;
                this.searchForm[1].disabled = true;
            },

            LogOut() {
                this.$message.success("登出成功");
                this.Cook.set("userName", null);
                this.$router.push({path: '/', query: {}});
            },

            handleStudent() {
                this.$router.push({path: '/', query: {}});
            },


            beforeDelete(studentId) {
                this.dialogVisible = true;
                this.deleteId = studentId;
            },

            handleDelete(studentId) {
                this.dialogVisible = false;
                this.$http.get("http://localhost:8521/student/deleteById?id=" + studentId,
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    this.$message.success(resp.data.msg);
                    if (code === '0000') {
                        this.handleCurrentChange(this.currentPage);
                        this.deleteId = "";
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                });
            }


        }
    }
</script>
<style scoped>
    * {
        font-size: 0.2vw;


    }

    #student {

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
        color: rgb(59, 65, 121);

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