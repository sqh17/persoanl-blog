<template>
  <a-modal
    :open="openRegister"
    title="注册"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="取消"
    okText="确认"
  >
    <a-form
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      :rules="rules"
      ref="formRef"
    >
      <a-form-item label="Email" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="昵称" name="nickName">
        <a-input v-model:value="formState.nickName" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="formState.confirmPassword" />
      </a-form-item>
      <a-form-item label="验证码" name="captcha" class="captcha-item" :wrapper-col="{ span: 8 }">
        <a-input v-model:value="formState.captcha" />
        <div class="captcha" v-html="captcha"></div>
      </a-form-item>
      <a-form-item label="个人简介" name="introduction">
        <a-textarea v-model:value="formState.introduction" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
defineProps({
  openRegister: {
    type: Boolean,
    default: false
  }
})
import type { Rule } from 'ant-design-vue/es/form'
import type { UnwrapRef } from 'vue'
const emit = defineEmits(['openRegisterFn'])
const handleOk = async (e: MouseEvent) => {
  console.log(e)
  await onSubmit()
}
const handleCancel = (e: MouseEvent) => {
  console.log(e)
  resetForm()
  emit('openRegisterFn', false)
}
interface FormState {
  email: string
  nickName: string
  password: string
  confirmPassword: string
  introduction: string
  captcha: string
}

const formState: UnwrapRef<FormState> = reactive({
  nickName: '',
  password: '',
  email: '',
  confirmPassword: '',
  introduction: '',
  captcha: ''
})
let captcha = ref('1233')
const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      validator: (_rule: Rule, val: string) => {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!reg.test(val) && val) {
          return Promise.reject('邮箱格式错误！')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (_rule: Rule, val: string) => {
        if (val !== captcha.value && val) {
          return Promise.reject('验证码错误')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (_rule: Rule, val: string) => {
        if (val !== formState.password) {
          return Promise.reject('密码不一致')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ]
}
const formRef = ref(null)
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values')
      emit('openRegisterFn', false)
    })
    .catch((error) => {
      console.log('error', error)
    })
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
::v-deep .captcha-item {
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    .captcha {
      margin-left: 10px;
    }
  }
}
</style>
