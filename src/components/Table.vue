<template>
  <div class="main">
    <!-- <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Date">{{name}}</el-table-column>
      <el-table-column label="Name"></el-table-column>
      <el-table-column align="right">
    eslint-disable-next-line-->
    <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>-->

    <div class="top">
      <div class="top-button">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="top-search">
        <div class="search-input">
          <el-input placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <div class="table-row" v-for="data in tableData" :key="data.id">
        <div class="row-main">
          <div class="table-row-left">
            <div class="row-pic">
              <el-image
                style="width: 75px; height: 100px"
                :src="'http://localhost:3000'+data.cover"
              ></el-image>
            </div>
            <div class="row-text">
              <h3 id="text-title">{{data.name}}</h3>
              <div id="text-body">主演：{{data.starring}}</div>
              <div id="text-body">导演：{{data.director}}</div>
              <div id="text-body">简介：{{data.description}}</div>
            </div>
          </div>
          <div class="table-row-right">
            <el-button type="warning" icon="el-icon-video-play" circle @click="route2VideoView(data.id)"></el-button>
            <el-button type="success" icon="el-icon-upload" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </div>
        <div class="row-floor">
          <el-divider></el-divider>
        </div>
      </div>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>-->
    </div>

    <el-dialog width="40%" title="电影" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="电影名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="演员" :label-width="formLabelWidth">
          <el-input v-model="form.starring" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导演" :label-width="formLabelWidth">
          <el-input v-model="form.director" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上映时间" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.releaseTime" autocomplete="off"></el-input> -->
          <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="国家" :label-width="formLabelWidth">
          <el-input v-model="form.country" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言" :label-width="formLabelWidth">
          <el-input v-model="form.language" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="form.tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" :label-width="formLabelWidth">
          <el-input v-model="form.length" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传封面" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.cover" autocomplete="off"></el-input> -->
          <el-upload
            action="/smart/storage/upload"
            list-type="picture-card"
            :headers="headers"
            :on-success="handlePicSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="上传影片" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.fileId" autocomplete="off"></el-input> -->
          <el-upload
            action="/smart/storage/upload"
            :headers="headers"
            :on-change="handleChange"
            :file-list="videoList"
            :on-success="handleVideoSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过4G</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createFilm">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['tableName'],
  data() {
    return {
      tableData: [],
      search: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        description: '',
        cover: '',
        starring: '',
        director: '',
        releaseTime: null,
        country: '',
        language: '',
        length: 0,
        fileId: null,
        tag: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      videoList: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePicSuccess(res, fileList) {
      this.form.cover = res.data.path
      // console.log(this.form)
    },
    createFilm() {
      axios({
        method: 'POST',
        url: '/smart/film/create',
        data: this.form
      }).then(res => {
        if (res.data.status === 200) {
          this.dialogFormVisible = false
          this.queryFilmList()
          this.form = {}
          this.clearFiles()
        } else {
          console.log(res.data.message)
        }
      })
    },
    queryFilmList() {
      axios({
        method: 'GET',
        url: '/smart/film/get/1/12'
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    handleChange(file, fileList) {
      // console.log(this.videoList)
      this.videoList = fileList.slice(-3)
      // console.log(this.videoList)
    },
    handleVideoSuccess(res, fileList) {
      if (res.status === 200) {
        this.form.fileId = res.data.id
        // console.log(this.form)
      } else {
        console.log(res.data.message)
      }
    },
    clearFiles() {
      this.fileList = []
      this.videoList = []
    },
    route2VideoView(id) {
      console.log(id)
      this.$router.push(`/videopreview/${id}`)
    }
  },
  mounted() {
    this.queryFilmList()
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.top {
  display: flex;
  flex-direction: row;
  height: 80px;
  align-items: flex-end;
}
.top-button {
  flex: 2;
  display: flex;
  padding-left: 24px;
}
.top-search {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
}
.search-input {
  width: 500px;
}
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.table-row {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.row-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.table-row-left {
  flex: 2;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-basis: 350px;
  padding-left: 24px;
}
.row-text {
  padding-left: 24px;
}
#text-title {
  font-family: PingFang SC;
  font-size: 16px Medium;
}
#text-body {
  font-family: Hiragino Sans GB;
  font-size: 12px Small;
}
.table-row-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
}
.row-floor {
  width: 100%;
}
</style>
