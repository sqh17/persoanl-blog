<template>
  <a-modal
    :open="openLogin"
    title="登录"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="取消"
    okText="登录"
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
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="验证码" name="captcha" class="captcha-item" :wrapper-col="{ span: 8 }">
        <a-input v-model:value="formState.captcha" />
        <div class="captcha" v-html="captcha"></div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
defineProps({
  openLogin: {
    type: Boolean,
    default: false
  }
})
import type { Rule } from 'ant-design-vue/es/form'
import type { UnwrapRef } from 'vue'
const emit = defineEmits(['openLoginFn'])
const handleOk = async (e: MouseEvent) => {
  console.log(e)
  await onSubmit()
}
const handleCancel = (e: MouseEvent) => {
  console.log(e)
  resetForm()
  emit('openLoginFn', false)
}
interface FormState {
  email: string
  password: string
  captcha: string
}

const formState: UnwrapRef<FormState> = reactive({
  password: '',
  email: '',
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
  ]
}
const formRef = ref(null)
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values')
      emit('openLoginFn', false)
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
