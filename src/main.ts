import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

String.prototype.replaceAll = function (s1: any, s2: any) {
  return this.replace(new RegExp(s1, 'gm'), s2)
}

const app = createApp(App)
app.use(ElementPlus)

app.use(store).use(router).mount('#app')
