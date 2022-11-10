<template>
  <div class="ces-search" >
 
       
    <el-dialog
    
      :title="title === 'edit' ? '编辑' :(title === 'add' ? '添加' : '详情')"
        :visible.sync="dialogFormVisible"
      :before-close="handleFormModalCancel"
      :width="formEditType === 'set' ? '400px' : '760px'"
      customClass="modalClass roleClass"
    >
      <el-form
        :size="size"
        inline
        :label-width="labelWidth"
        :model="searchData"
        ref="searchData"
        :rules="rules"
        class="formClass">

        <template v-for="item in searchForm">
          <el-form-item
            v-if="item.isFormItemShow"
            :label="item.label"
            :key="item.prop"
            :prop="item.prop"
            :label-width="item.width">

            <el-input
              v-if="item.type==='Input'"
              v-model="searchData[item.prop]"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"></el-input>

             <el-date-picker 
             v-if="item.type==='Picker'"
              v-model="searchData[item.prop]"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"></el-date-picker>

            <el-select
              v-if="item.type==='Select'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              size="small">

              <el-option
                v-for="op in item.props"
                :label="op.className"
                :value="op.classCode"
              ></el-option>

            </el-select>

            <el-input
              v-if="item.type==='TextArea'"
              v-model="searchData[item.prop]"
              type="textarea"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            ></el-input>
            <el-tree
              v-if="item.type==='Tree'"
              ref="tree"
              :data="item.props"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="checkedDedault"
              @check-change="getCheckedKeys"
            />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer" :style="{display: title === 'detail' ? 'none' : ''}">
        <el-button type="danger" @click="handleFormModalCancel('searchData')">取 消</el-button>
        <el-button class="btn" type="warning"  @click="handleFormModalOk('searchData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: Object,
      default: {}
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    size: {
      type: String,
      default: "small"
    },
    searchForm: {
      type: Array,
      default: []
    },
    searchData: {
      type: Object,
      default: {}
    },
    formEditType: {
      type: String,
      default: "add"
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    checkedDedault: {
      type: Array
    },
    title: {
      type: String,
      default: "add",
      required: true
    },
  },
  data() {
    return {
      newDialogFormVisible: false,
     newFormEditType: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
   
  },
  watch: {
    formEditType: {
      handler(newVal, oldVal) {
       
        this.newFormEditType = newVal;
      }
    },

    dialogFormVisible: {
      handler(newVal, oldVal) {
        this.newDialogFormVisible = newVal;
      }
    }
  },

  methods: {
    handleFormModalOk(searchData) {
       this.$refs[searchData].validate(valid => {
        if (valid) {
              this.$emit('validateTrue',this.searchData)
        } else {
          console.log('error submit!!')
          return false
        }
       })
          
      
    
    },
    handleFormModalCancel(searchData) {
      this.newDialogFormVisible = false;
      this.$refs.searchData.resetFields();
      this.$emit("closeDialogFunc", this.newDialogFormVisible);
    },
    getCheckedKeys(data, checked, indeterminate) {
      var roleTemp = [];
      var roleArr = this.$refs.tree[0]
        .getHalfCheckedKeys()
        .concat(this.$refs.tree[0].getCheckedKeys());

      for (var i = 0; i < roleArr.length; i++) {
        roleTemp.push({ id: roleArr[i] });
      }
      this.$emit("getCheckedKeys", roleTemp);
    }
  }
};
</script>
<style lang="scss">
.el-input__inner {
  width: 200px;
}
.btn{
  background: violet;
}

</style>