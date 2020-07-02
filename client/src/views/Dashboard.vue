<template>
<div class="row mt-5">
    <div class="col-2 border-right" style="height: 80vh;">
        <h4>test</h4>
    </div>
    <div class="col">
        <div class="row row-cols-1 row-cols-md-3 mr-1">
            <CardProduct v-for="(data, i) in fetchProducts" :key="i" :product="data"></CardProduct>
        </div>
    </div>
</div>
</template>

<script>
import CardProduct from '../components/CardProduct.vue'
// import ListCart from '../components/ListCart.vue'

export default {
    name: 'Dashboard',
    components: {
        CardProduct,
    },
    methods: {
        checkout() {
            this.$store.dispatch('checkout')
        }
    },
    computed: {
        fetchProducts() {
            return this.$store.state.products
        },
        fetchCart() {
            return this.$store.state.listCart
        },
        grandTotalPrice() {
            let total = 0
            this.$store.state.listCart.forEach(el => {
                total += el.total_price 
            })
            return total
        }
    },
    created() {
        this.$store.dispatch('getProducts')
    }
};
</script>
