<template>
    <div class="page-index-content">
        <h1>index page</h1>
        <div class="content">
            <div class="block">
                <span class="demonstration">页数较少时的效果</span>
                <el-pagination
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
            <div class="block">
                <span class="demonstration">大于 7 页时的效果</span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
        <div style="height: 1000px; background-color: #40A9F5">1000px</div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~scss/mixins";
    .index-wrap{
        height: 100%;
        position: relative;
        background-color: $color1;
        // background: url("../images/indexbg.jpg") no-repeat;
        background-size: cover;
        .index-content {
            position: relative;
            margin: 0 auto;
            background: rgba(0,0,0,0.3);
            padding: 20px;
            height: 1200px;
            h1{
                font-size: 30px;
                font-weight: bold;
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                currentPage: 3
            }
        },
        created() {
            setTimeout(() => {
                this.currentPage = 5
            }, 3000)

            setTimeout(() => {
                this.currentPage = 1
            }, 6000)
        },
        methods: {

        }
    }
</script>
