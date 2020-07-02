<template>
    <div class="row mt-5 ml-3">
        <div class="col-7">
            <div v-for="(product, i) in fetchCart" :key="i">
                <ListCart :data="product" class="mb-2"></ListCart>
            </div>
        </div>
        <div class="border-left col" style="height: 80vh;">
            <h4 class="text-center">Summary</h4>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between mr-3" v-for="(data, i) in fetchCart" :key="i">
                    <div>
                        {{ data.Product.name}}
                    </div>
                    <div>
                        x {{ data.quantity}}
                    </div>
                    <div>
                        IDR {{ new Intl.NumberFormat().format(data.total_price) }}
                    </div>
                </li>
                <li class="list-group-item mr-3 d-flex justify-content-between bg-foster-50 text-white">
                    <div class="text-right">
                        <strong>Grand Total : </strong>
                    </div>
                    <div class="text-right">
                        <strong>IDR {{ new Intl.NumberFormat().format(grandTotalPrice) }}</strong> 
                    </div>
                </li>
                <li class="list-group-item mr-3 d-flex justify-content-end">
                    <a type="button" class="btn btn-carrot" @click="checkout" 
                        :class="fetchCart.length > 0 ? '' : 'disabled'">
                        CHECKOUT ({{ fetchCart.length }})
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ListCart from '../components/ListCart.vue'

export default {
    name: 'Cart',
    components: {
        ListCart
    },
    methods: {
        checkout() {
            this.$store.dispatch('checkout')
        }
    },
    computed: {
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
        this.$store.dispatch('getCarts')
    }
}
</script>
