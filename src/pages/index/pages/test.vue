<template>
    <div class="test-page">
        <h1>2000条数据渲染测试</h1>

        <div class="mt20">
            <select name="" id="">
                <option value="1">选择 1</option>
                <option value="2">选择 2</option>
                <option value="4">选择 3</option>
                <option value="3">选择 4</option>
            </select>
        </div>

        <div class="mt20">
            <h3>当前选中的值 {{curSelect}}</h3>
            <select name="" v-model="curSelect">
                <template v-for="(item,index) in list">
                    <option :value="index" :key="index">选择第{{index}}个</option>
                </template>
            </select>

            <!--<el-select v-model="curSelect" placeholder="请选择">-->
                <!--<el-option-->
                    <!--v-for="(item, index) in list"-->
                    <!--:key="index"-->
                    <!--:label="`选择第${index}个`"-->
                    <!--:value="index">-->
                <!--</el-option>-->
            <!--</el-select>-->
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .test-page{

    }
</style>

<script>
    function createItems(len = 3000) {
        return new Array(len).fill('1')
    }

    export default{
        data() {
            return {
                loop: false,
                curSelect: 100,
                list: createItems()
            }
        },
        created() {
            function changeSelect() {
                setTimeout(() => {
                    this.curSelect = ++this.curSelect
                    console.log(this.curSelect)
                    this.loop && (changeSelect.call(this))
                }, 1000)
            }

            this.loop = true
            changeSelect.call(this)
        },
        beforeDestroy() {
            this.loop = false
        }
    }
</script>
