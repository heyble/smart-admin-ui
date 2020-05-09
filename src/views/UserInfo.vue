<template>
  <div>
    <el-container>
      <el-header style="height: 100px;padding: 0">
        <top></top>
      </el-header>

      <el-container>
        <el-header style="height: 100px;padding: 0">
          <top></top>
        </el-header>
        <el-main class="main">
          <tags>
            <div slot="personalCenter">
              <div class="main-top">
                <span>个人中心</span>
                <el-divider></el-divider>
              </div>
              <div class="main-main">
                <div class="main-main-left">
                  <div class="block">
                    <el-avatar
                      :size="100"
                      :src="currentUser.avatar == '' ? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' : currentUser.avatar"
                    ></el-avatar>
                  </div>
                  <el-link type="primary" v-show="isUpdate">修改头像</el-link>
                </div>
                <div class="main-main-center">
                  <div class="main-main-center-info" v-show="!isUpdate">
                    <div class="text item">手机号：{{currentUser.phoneId}}</div>
                    <div class="text item">用户名：{{currentUser.name}}</div>
                    <div class="text item">个性签名：{{currentUser.signature}}</div>
                    <div class="text item">e-mail：{{currentUser.eMail}}</div>
                    <div class="text item">生日：{{currentUser.birthday}}</div>
                  </div>
                  <div class="mian-mian-center-update" v-show="isUpdate">
                    <div class="text item">
                      手机号：
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        :disabled="true"
                        v-model="currentUser.phoneId"
                        maxlength="11"
                        show-word-limit
                      ></el-input>
                    </div>
                    <div class="text item">
                      用户名：
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="currentUser.name"
                        maxlength="10"
                        show-word-limit
                      ></el-input>
                    </div>
                    <div class="text item">
                      个性签名：
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="currentUser.signature"
                        maxlength="10"
                        show-word-limit
                      ></el-input>
                    </div>
                    <div class="text item">
                      e-mail：
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="currentUser.eMail"
                        maxlength="10"
                        show-word-limit
                      ></el-input>
                    </div>
                    <div class="text item">
                      生日：
                      <el-date-picker v-model="currentUser.birthday" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                    <div class="mian-mian-center-update-button">
                      <el-button type="primary" @click="updateUserInfo()">保存</el-button>
                      <el-button type="primary" @click="enableEdit(false)">返回</el-button>
                    </div>
                  </div>
                </div>
                <div class="main-main-right">
                  <el-link
                    icon="el-icon-edit"
                    type="primary"
                    v-show="!isUpdate"
                    @click="enableEdit(true)"
                  >编辑资料</el-link>
                </div>
              </div>
            </div>
          </tags>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from '@/components/Top'
import tags from '@/components/UserTags'
import axios from 'axios'
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      currentUser: {},
      isUpdate: false
    }
  },
  methods: {
    enableEdit(isUpdate) {
      this.isUpdate = isUpdate
    },
    updateUserInfo() {
      axios({
        url: '/smart/user/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.currentUser
      }).then(res => {
        if (res.data.status === 200) {
          sessionStorage.setItem('currentUser', JSON.stringify(res.data.data))
          this.enableEdit(false)
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error',
            duration: 0
          })
        }
      })
    }
  },
  mounted() {
    console.log(sessionStorage.getItem('currentUser'))
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  },
  components: {
    top,
    tags
  },
  computed: {
    // ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 70%;
  margin: auto;
}
.main-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-right: 30px;
  margin-bottom: 50px;
}
.main-main-left {
  text-align: center;
  flex-grow: 1;
  flex-shrink: 0;
}
.main-main-center {
  flex-grow: 3;
  flex-shrink: 0;
  flex-basis: 350px;
}
.main-main-right {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: flex-end;
}
.mian-mian-center-update-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.text {
  font-size: 14px;
}
.item {
  padding: 8px 0;
  margin-left: 30px;
}
// .box-card {
//   width: 480px;
// }
</style>
