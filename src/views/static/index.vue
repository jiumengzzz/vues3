<!--  -->
<template>
  <div class="">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-input v-model="query.name" placeholder="请输入分类名称"></el-input>
    <el-button
      type="primary"
      icon="el-icon-search"
      size="mini"
      @click="queryName"
      >搜索</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-refresh"
      size="mini"
      @click="resetQuery"
      >重置</el-button
    >
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column label="id" prop="id" width="180"></el-table-column>
      <el-table-column label="名称" prop="name" width="180"></el-table-column>
      <el-table-column
        label="专题数量"
        prop="subjectCount"
        width="180"
      ></el-table-column>
      <el-table-column label="排序" prop="sort" width="180"></el-table-column>
      <el-table-column label="显示状态" prop="showStatus" width="180">
        <template #default="{ row }">
          <span>{{ row.showStatus === 1 ? "使用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" prop="icon" width="180">
        <template #default="scope">
          <img :src="scope.row.icon" style="max-width: 100%" />
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

      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
            <el-input
              v-model="form.name"
              autocomplete="off"
              v-on:blur="validateName"
            />
          </el-form-item>
          <el-form-item label="主题数量" :label-width="formLabelWidth">
            <el-input
              type="number"
              v-model="form.subjectCount"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input type="number" v-model="form.sort" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="显示状态"
            prop="showStatus"
            :label-width="formLabelWidth"
          >
            <el-radio v-model="form.showStatus" :value="0" label="0">禁用</el-radio>
            <el-radio v-model="form.showStatus" :value="1" label="1">使用</el-radio>

          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input type="icon" v-model="form.icon" autocomplete="off" />
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
  topiccategory,
  topiccategoryDel,
  addtopiccategory,
  edittopiccategory,
  queryName,
} from "../../http/index";
import "../../style/bg.css";
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
      },

      query: {
        current: 1,
        size: 10,
        name: undefined,
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
        addtopiccategory(this.form)
          .then((res) => {
            // console.log(res)
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
        edittopiccategory(this.form)
          .then((res) => {
            // console.log(res)
            this.dialogFormVisible = false;
            this.loadingData();
            if (String(res.code) == "1") {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch(() => {});
      }
    },
    //表单校验
    validateName() {
      console.log("validateName");
      if (!this.form.name) {
        this.$refs.form.validateField("rules.name", "请输入名字", (message) => {
          console.log(`validate error: ${message}`);
        });
      } else {
        this.$refs.form.clearValidate("rules.name");
      }
    },
    //添加
    add() {
      this.dialogTitle = "新增回复";
      this.addOrUpdate = 1;
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑
    handleEdit(e) {
      this.dialogTitle = "编辑回复";
      this.addOrUpdate = 2;
      this.form = { ...e };
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(e) {
      this.$confirm("确认删除该信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(e);
        topiccategoryDel(e)
          .then((res) => {
            // console.log(res)
            this.loadingData();
            if (res.code == 1) {
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(() => {});
      });
    },
    //分页查询
    loadingData() {
      topiccategory(this.filter)
        .then((res) => {
          // console.log(res)
          this.tableData = res.data.page.records;
          this.total = parseInt(res.data.page.total);
        })
        .catch(() => {});
    },
    //查询
    queryName() {
      queryName(this.query).then((res) => {
        console.log(res);
        this.tableData = res.data.cmsTopicCategories;
        this.total = res.data.cmsTopicCategories.length;
        console.log(this.total);
      });
    },
    //重置查询条件并刷新
    resetQuery() {
      this.query.name = undefined;
      this.loadingData();
    },
  },
});
</script>

<style lang='less' scoped>
</style>