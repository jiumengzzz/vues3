<!--  -->
<template>
  <div class="">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增话题</el-button>
        
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" prop="id" width="180"></el-table-column>
      <el-table-column
        label="类别标识"
        prop="categoryId"
        width="180"
      ></el-table-column>
      <el-table-column label="名字" prop="name" width="180"></el-table-column>
      <el-table-column
        label="奖项标识"
        prop="awardName"
        width="180"
      ></el-table-column>
      <el-table-column
        label="内容"
        prop="content"
        width="180"
      ></el-table-column>
      <el-table-column
        label="出席类型"
        prop="attendType"
        width="180"
      ></el-table-column>
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

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"  v-on:blur="validateName" />
        </el-form-item>
        <el-form-item label="类别标示" :label-width="formLabelWidth" prop="categoryId">
          <el-input
            type="number"
            v-model="form.categoryId"
            autocomplete="off"
            v-on:blur="validateName"
          />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" autocomplete="off"  v-on:blur="validateName" />
        </el-form-item>
        <el-form-item label="奖项标识" :label-width="formLabelWidth">
          <el-input v-model="form.awardName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出席类型" :label-width="formLabelWidth">
          <el-input v-model="form.attendType" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出席人数" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="form.attendCount"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="注意计数" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="form.attentionCount"
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
import { topic, topicDel, addtopic, edittopic } from "../../http/index";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      addOrUpdate: 1,
      dialogTitle: "",
      formLabelWidth: 180,
      dialogFormVisible: false,
      tableData: [],
      form: {},
      total: 0,
      filter: {
        current: 1,
        size: 10,
      },
      rules: {
        name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" },
        ],
        categoryId:[
          { required: true, message: "类别标识不能为空", trigger: "blur" }
        ],
        content:[
        { required: true, message: "内容不能为空", trigger: "blur" }
        ]
      },
    };
  },
  components: {},
  mounted() {
    this.loadingData();
  },
  methods: {
    primary() {
      if (this.addOrUpdate == 1) {
        addtopic(this.form)
          .then((res) => {
            console.log(res);
            this.dialogFormVisible = false;
            this.loadingData();
            this.$message.success("添加成功");
          })
          .catch(() => {});
      } else {
        edittopic(this.form)
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
    add() {
      this.dialogTitle = "新增回复";
      this.addOrUpdate = 1;
      this.form = {};
      this.dialogFormVisible = true;
    },
    handleEdit(e) {
      this.dialogTitle = "编辑回复";
      this.addOrUpdate = 2;
      this.form = { ...e };
      this.dialogFormVisible = true;
    },
    handleDelete(e) {
      this.$confirm("确认删除该条数据, 是否继续?", "确定删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        console.log(e);
        topicDel(e)
          .then((res) => {
            console.log(res);
            this.loadingData();
          })
          .catch(() => {});
      });
    },
    loadingData() {
      topic(this.filter)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.page.records;
          this.total = parseInt(res.data.page.total);
        })
        .catch(() => {});
    },
    validateName() {
    console.log("validateName");
    if (!this.form.name) {
      this.$refs.form.validateField("rules.name",'请输入名字', (message) => {
        console.log(`validate error: ${message}`);
      });
    } else {
      this.$refs.form.clearValidate("rules.name");
    }
    if (!this.form.categoryId) {
      this.$refs.form.validateField("rules.categoryId",'请输入名字', (message) => {
        console.log(`validate error: ${message}`);
      });
    } else {
      this.$refs.form.clearValidate("rules.categoryId");
    }
    if (!this.form.content) {
      this.$refs.form.validateField("rules.content",'请输入名字', (message) => {
        console.log(`validate error: ${message}`);
      });
    } else {
      this.$refs.form.clearValidate("rules.content");
    }
  },
  },
});
</script>

<style lang='less' scoped>
</style>