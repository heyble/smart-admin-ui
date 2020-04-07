<template>
  <div class="logincard">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix" style="border-bottom: 0px solid #EBEEF5">
        <!-- <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">手机号登陆</el-menu-item>
          <el-menu-item index="2">邮箱登陆</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phoneId">
            <el-input v-model.number="ruleForm.phoneId"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    var checkPhoneId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.length < 13) {
            callback(new Error('手机号格式不正确'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      activeIndex: '1',
      ruleForm: {
        phoneId: '',
        pass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        phoneId: [{ validator: checkPhoneId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(formName)
          axios({
            method: 'POST',
            url: '/login',
            data: {
              phoneId: this.ruleForm.phoneId,
              password: this.ruleForm.pass
            }
          }).then(res => {
            // console.log(res.data)
            localStorage.setItem('Authorization', res.data.data)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.logincard {
  margin-right: 10%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

#box-card-header {
  border-bottom: 0px solid #ebeef5;
}
</style>
