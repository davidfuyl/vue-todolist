<template>
    <div>
        <h1 v-text="title"></h1> <!--{{title}}是v-text的简写形式-->
        <span v-html="inputMsg"></span>
        <input v-model.trim="inputVal" @keyup.enter="onEnter"> <!--v-html可以解析html标签，但是不会展示出来-->
        <button v-text="submitText" @click="submitBtn"></button>
        <div class="content">
            <ul v-for="(item, index) in items"
                v-bind:key="index" 
                :class="{showUnderline: item.isDone}" 
                @click="toggleStyle(item)">
                <!-- <li>{{index}}{{item.lable}} {{item.isDone}}</li> -->
                <li>
                    {{item.label}}
                </li>
            </ul>
        </div>
        <button v-text="clearItems" @click="removeItems" class="cleanBtn"></button>
    </div>
</template>

<script>
import Store from './store';
export default {
    data () {
        return {
            title: 'Todo List of Vuejs',
            inputVal: '',
            inputMsg: '<span style="color: red">请输入：</span>',
            submitText: '提 交',
            clearItems: '清 空',
            isShow: false,
            item: {
                isDone: false
            },
            items: Store.fetch() || [] // if Store.fetch()为空，则默认为空数组
        }
    },

    computed: {},
    // 以下钩子函数没有用到
    // beforeCreate () {},
    // mounted () {},
    // created () {},
    methods: {
        submitBtn: function () {
            if (this.inputVal === "" || this.inputVal == null) {
                return false;
            }
            this.items.push({
                label: this.inputVal,
                isDone: false
            });
            this.inputVal = ''
        },
        onEnter: function () {
            if (this.inputVal === "" || this.inputVal == null) {
                return false;
            }
            this.items.push({
                label: this.inputVal,
                isDone: false
            });
            this.inputVal = ''
        },
        toggleStyle: function (item) {
            item.isDone = !item.isDone;
        },
        removeItems: function () {
            this.items = []
        }
    },
    watch: {
        items: {
            handler: function (items) {
                Store.save(items);
            },
            // handler1: function () {},可以添加多个handler来监听多个属性值的变化
            deep: true
        }
    },
    filters: {}
}
</script>


<style scoped>
.showUnderline {
    text-decoration: underline;
}
.cleanBtn {
    margin: 5px 0px;
}
</style>


