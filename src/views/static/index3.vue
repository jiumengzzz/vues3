<!--  -->
<template>
  <div class="">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="主题标识"
        prop="topicId"
        width="180"
      ></el-table-column>
      <el-table-column
        label="内容"
        prop="content"
        width="180"
      ></el-table-column>
      <el-table-column
        label="会员昵称"
        prop="memberNickName"
        width="180"
      ></el-table-column>
      <el-table-column label="显示状态" prop="showStatus" width="180">
        <template #default="{ row }">
          <span>{{ row.showStatus === 1 ? "使用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成员图片" prop="memberIcon" width="180">
        <template #default="scope">
          <img :src="scope.row.memberIcon" style="max-width: 100%" />
        </template>
      </el-table-column>

      <el-table-column width="180" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="loadingData"
      v-model:current-page="filter.current"
      small
      background
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
    />
    <!-- 新增 弹出表单 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="内容"
          :label-width="formLabelWidth"
          prop="content"
          type="text"
        >
          <el-input
            v-model="form.content"
            autocomplete="off"
            v-on:blur="validateName"
          />
        </el-form-item>
        <el-form-item
          label="会员昵称"
          :label-width="formLabelWidth"
          prop="memberNickName"
          type="text"
        >
          <el-input
            v-model="form.memberNickName"
            autocomplete="off"
            v-on:blur="validateName"
          />
        </el-form-item>
        <el-form-item
          label="主题标识"
          :label-width="formLabelWidth"
          prop="topicId"
          type="text"
        >
          <el-input
            type="form.topicId"
            v-model="form.topicId"
            autocomplete="off"
            v-on:blur="validateName"
          />
        </el-form-item>
        <el-form-item
          label="显示状态"
          prop="showStatus"
          :label-width="formLabelWidth"
        >
          <el-radio v-model="form.showStatus" label="0">禁用</el-radio>
          <el-radio v-model="form.showStatus" label="1">使用</el-radio>

        </el-form-item>
        <el-form-item label="成员图片" :label-width="formLabelWidth">
          <el-input
            type="memberIcon"
            v-model="form.memberIcon"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="primary"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  topiccomment,
  delComment,
  addtopiccomment,
  edittopiccomment,
} from "../../http/index";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      //添加或更新表示
      addOrUpdate: 1,
      dialogTitle: "",
      formLabelWidth: 180,
      //弹出对话框
      dialogFormVisible: false,
      //表格数据
      tableData: [],
      //表单数据
      form: {},
      total: 0,
      //分页条件
      filter: {
        current: 1,
        size: 10,
      },
      rules: {
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        memberNickName: [
          { required: true, message: "会员昵称不能为空", trigger: "blur" },
        ],
        topicId: [
          { required: true, message: "主题标识不能为空", trigger: "blur" },
        ],
      },
      components: {},
    };
  },

  mounted() {
    this.loadingData();
  },
  methods: {
    //添加或修改
    primary() {
      if (this.addOrUpdate == 1) {
        addtopiccomment(this.form)
          .then((res) => {
            console.log(res);
            this.dialogFormVisible = false;
            this.loadingData();
            if (res.code == 1) {
              this.$message.success("添加成功");
            } else {
              this.$message.error("添加失败");
            }
          })
          .catch(() => {});
      } else {
        edittopiccomment(this.form)
          .then((res) => {
            console.log(res);
            this.dialogFormVisible = false;
            this.loadingData();
            if (res.code == 1) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch(() => {});
      }
    },
    //添加弹出
    add() {
      this.dialogTitle = "新增回复";
      this.addOrUpdate = 1;
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑弹出
    handleEdit(e) {
      this.dialogTitle = "编辑回复";
      this.addOrUpdate = 2;
      this.form = { ...e };
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(e) {
      this.$confirm("确认删除该条数据, 是否继续?", "确定删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        console.log(e);
        delComment(e)
          .then((res) => {
            console.log(res);
            this.loadingData();
            this.$message.success("删除成功");
          })
          .catch(() => {});
      });
    },
    //查询所有 分页查询
    loadingData() {
      topiccomment(this.filter)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.page.records;
          this.total = parseInt(res.data.page.total);
        })
        .catch(() => {});
    },
    //表单校验
    validateName() {
      console.log("validateName");
      if (!this.form.content) {
        this.$refs.form.validateField(
          "rules.content",
          "请输入内容",
          (message) => {
            console.log(`validate error: ${message}`);
          }
        );
      } else {
        this.$refs.form.clearValidate("rules.content");
      }
      if (!this.form.memberNickName) {
        this.$refs.form.validateField(
          "rules.memberNickName",
          "请输入会员名称",
          (message) => {
            console.log(`validate error: ${message}`);
          }
        );
      } else {
        this.$refs.form.clearValidate("rules.memberNickName");
      }
      if (!this.form.topicId) {
        this.$refs.form.validateField(
          "rules.topicId",
          "请输入主题标识",
          (message) => {
            console.log(`validate error: ${message}`);
          }
        );
      } else {
        this.$refs.form.clearValidate("rules.topicId");
      }
    },
  },
});
</script>

<style lang='less' scoped>
</style>