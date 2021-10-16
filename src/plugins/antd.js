import Vue from 'vue'
import {
    Affix,
    Avatar,
    BackTop,
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Form,
    Icon,
    Input,
    Layout,
    Menu,
    message,
    Modal,
    Popover,
    Row,
    Skeleton,
    Spin,
    Tag,
    Timeline
} from 'ant-design-vue'

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Divider)
Vue.use(Timeline)
Vue.use(Card)
Vue.use(Affix)
Vue.use(Skeleton)
Vue.use(BackTop)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Spin)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Form)
Vue.use(Modal)

Vue.prototype.$message = message