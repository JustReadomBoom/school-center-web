<template>
  <div id="class">
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
     <el-row class="user"> <el-tag class="alert" style="color: rgb(64, 94, 114);" size="medium" >登录用戶：{{username}}</el-tag> <el-button class="badge" size="mini" type="info"  @click="LogOut()">退出</el-button></el-row>

    <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
    class="in"
      v-model="keywords">
    </el-input>
    <el-button class="btn" size="small" type="primary" icon="el-icon-search" @click="searchClick()">搜索</el-button>
  </div>

    <el-row class="guanli" > 
     <el-row style="margin-top:30px;"> 
      <el-button class="btn" size="mini" type="primary" @click="handleStudent()">学生管理</el-button>
    </el-row>
    <el-row style="margin-top:20px;"> 
      <el-button class="btn" disabled=true size="mini" type="primary" @click="handleclassess()">班级管理</el-button>
    </el-row>
   
          
    </el-row>
   </div>
       <el-row style="margin-top:20px;margin-left:10%;"> 
      <el-button class="btn"  size="mini" type="primary" @click="handleAdd()">添加</el-button>
    </el-row>
    <el-row class="row alert alert-info" style="height: 80%;">
 
         
      <el-table class="table table-striped" :data="classesss" style="width: 100%">
       
        <el-table-column label="班级编号" :span="8">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班级名称" :span="8">
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班主任名称" :span="8">
          <template slot-scope="scope">
            <span>{{ scope.row.classTeacher }}</span>
          </template>
        </el-table-column>




  
        <el-table-column prop="mit" label="操作"  width="180">
          <template slot-scope="scope">
            <el-button  type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            
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
        name:"搜索...",
        username:'',
        classesss: [],
        keywords:"",
        dialogFormVisible:false,
        formEditType:'add',
        currentPage: 1,
        pagesize: 10,
        total:1,
        authgroupForm: {
          id:'',
          className:'',
          classTeacher:'',
         
        
       
      },
      searchForm: [
        {
          type: "Input",
          label: "编号",
          prop: "id",
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
          label: "班主任名称",
          prop: "classTeacher",
          width: "120px",
          isFormItemShow: true
        },
     
      
      ],
       
        rules: {
        id: [
          { required: true, message: "请输入班级编号", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        classTeacher: [{ required: false, message: "请输入班主任姓名", trigger: "blur" }],
        
        }
      }
    },
    created() {
        if(this.username = this.$route.query.username){
          this.Cook.set("username",this.username);
      }else{
        this.username = this.Cook.get("username");
      }
     
      
    },
    mounted() {
    
   this.handleCurrentChange(this.currentPage);
    this.pagesize = this.total%this.currentPage
  
    if(this.$route.query.username === "root"){
    
        this.seen=true;
      }
    },
    methods: {
      validateTrue(searchData) {
       
       console.log("searchData",searchData)
      if (this.formEditType === "edit") {
        this.editclassesss(searchData);
      } else if (this.formEditType === "add") {
         this.addclassesss(searchData);
      }
      this.dialogFormVisible = false;
    },
    validateFalse() {
      this.dialogFormVisible = true;
    },
    closeDialog(newDialogFormVisible) {
      
      this.dialogFormVisible = newDialogFormVisible;
    },

  editclassesss(searchData){

    this.$axios.put('http://localhost:8080/class/'+searchData.id,
            {
            "className":searchData.className,
            "classTeacher":searchData.classTeacher,
           
            
            }
        ).then(
         resp=>{
          
           if (resp.data.code === 20000) {
             
           this.$message.success("修改成功")
            this.handleCurrentChange(this.currentPage);
         }else{
           this.$message.error("修改失败")
         }
         })
    
      
  },
  addclassesss(searchData) {
      
        this.$axios.post('http://localhost:8080/class/',
            {
            "id":searchData.id,
            "className":searchData.className,
            "classTeacher":searchData.classTeacher,
        
            }
        ).then(
         resp=>{
          
           if (resp.data.code === 20000) {
             
            this.$message.success(resp.data.message)
            this.handleCurrentChange(this.currentPage);
    
         }else{
            
              this.$message.error("添加失败，请检查编号是否重复")
         }
         })
    
      
      },
      searchResuls(keywords){
          if(keywords){
            this.handClassName(keywords);
          }else{
            this.handleCurrentChange(this.currentPage);
          }
          
      },
       handleSizeChange: function (size) {
        this.pagesize = size;
        console.info(size)
      },
      
      handleCurrentChange: function(currentPage){
       this.$axios.get('http://localhost:8080/class/getClassByPage/'+currentPage+'/'+7).then(
         resp=>{
          
           if (resp.data.code === 20000) {
             
           this.classesss = resp.data.data.records
           this.total = resp.data.data.total
             console.log(resp.data.data)
         }else{
              this.$message.warning("请先登录")
           this.$router.push({path:'/',query:{}});
         }
         })
        console.info(currentPage)
      },
      handleStudent(){
          this.$router.push({path:'/student',query:{}});
      },
  
searchClick(){
     
          this.$axios.get('http://localhost:8080/class/search/'+this.keywords).then(
         resp=>{
          
           if (resp.data.code === 20000&&resp.data.data!=null) {
            
             this.classesss=[resp.data.data]
        
             this.$message.success(resp.data.message)
         }else{
           this.$message.warning("未找到该班级")
         }
         }).catch((error)=> {
               this.$message.warning("未找到该班级")
            })
      },
      handleEdit(searchData) {
        this.authgroupForm.id=searchData.id,
           this.authgroupForm.className=searchData.className,
          this.authgroupForm. classTeacher=searchData.classTeacher,
         this.dialogFormVisible=!this.dialogFormVisible;
        this.formEditType='edit';
        this.searchForm[0].disabled=true;
     
       
      },
            LogOut(){
        
        this.$axios.get('http://localhost:8080/logout').then(
         resp=>{
          
       
            this.$message.success("登出成功")
         
           
              this.Cook.set("username",null);
              this.$router.push({path:'/',query:{}});
      
         })
      },
      handleAdd(){
        this.dialogFormVisible=!this.dialogFormVisible;
          this.formEditType='add';
        this.searchForm[0].disabled=false;
        
      },
      handleDelete(id) {
       var _this = this
       this.$axios
         .delete('http://localhost:8080/class/' + id, {}).then(resp => {
           if (resp && resp.data.code === 20000) {
             this.handleCurrentChange(this.currentPage);
             this.$message.success(resp.data.message)
           }else{
              this.$message.error("删除失败")
           }
         })
      }
    }
      }
    
</script>
<style scoped>
*{
  font-size:0.2vw;


}

#class{

  margin-left:5%;
  width: 90%;


}
.row{
  width: 80%;
  margin-left:10%;
}
.guanli{
  width: 20%;
  position:absolute;
  margin-right: 40px;
  
}
.pagination{
 
  width: 30%;
  margin-left: 10%;
  margin-bottom: 20px;
  color: rgb(64, 94, 114);

}
.btn{
 background: rgb(64, 94, 114);
}
.user{
  
  float: left;
  margin-right: 100px;
}
.in{
  float: left;
width: 60%;

}
.bar{
  width: 80%;
}
</style>