<template>
    <div class="container mt-3 mb-5">
        <h2 class="text-center text-secondary mb-3">History Transactions</h2>
        <div class="row row-cols-1 row-cols-md-2">
            <div v-for="(product, i) in fetchTransactions" :key="i" class="col mb-4">
                <ListTransactions :data="product" class="mb-2 shadow-sm"></ListTransactions>
            </div>
        </div>
    </div>
</template>


<script>
import ListTransactions from '../components/ListTransactions.vue'
export default {
    name: 'Transactions',
    components: {
        ListTransactions
    },
    computed: {
        fetchTransactions() {
            return this.$store.state.transactions
        }
    },
    created() {
        this.$store.dispatch('getTransactions')
    }
}
</script>
