<template>
    <div class="card">
        <div class="row no-gutters">
            <div class="col-4 border border-light" style="max-width: 120px; ">
                <img :src="data.Product.img_url" class="card-img-top" style="max-height: 120px;" :alt="data.Product.name">
            </div>

            <div class="col-8 pb-1 ml-4">
                <div>
                    <h6>{{ data.Product.name }}</h6>
                </div>
                <div>
                    <h6 class="text-secondary">{{ data.Product.description }}</h6>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-3 mb-0">
                    <div class="">
                        <h6 class="text-secondary">IDR {{ fetchTotal }}</h6>
                    </div>
                    <div class="d-flex">
                        <div class="d-flex">
                            <div class="d-flex align-items-center justify-content-end">
                                <a type="button" @click="decrement(data.id, data.Product.price)" :class="quantity == 0 ? 'disabled' : ''">
                                    <img src="../assets/minus.png" alt="-">
                                </a>
                                <input 
                                    type="number" min="1" class="form-control" 
                                    style="width: 30%; height: 95%; font-size: 12px;"
                                    v-model="quantity">
                                <a type="button" @click="increment(data.Product.stock, data.id, data.Product.price)">
                                    <img src="../assets/plus.png" alt="+">
                                </a>
                            </div>
                        </div>

                        <a type="button" class="ml-3" @click="destroy(data.id)">
                            <img src="../assets/trash-can.png" alt="-">
                        </a>
                    </div>
                </div>
                
            </div>    
        </div>
    </div>
        
</template>

<script>
export default {
    name: 'ListCart',
    props: ['data'],
    data() {
        return {
            quantity: this.data.quantity
        };
    },
    methods: {
        increment(stock, id, price) {
            if (Number(stock) > this.quantity) {
                this.quantity++
                this.$store.dispatch('editQuantity', {
                    quantity: this.quantity,
                    total_price: Number(this.quantity) * Number(price),
                    id
                })
            }
        },
        decrement(id, price) {
            if (Number(this.quantity) > 0) {
                this.quantity--
                this.$store.dispatch('editQuantity', {
                    quantity: this.quantity,
                    total_price: Number(this.quantity) * Number(price),
                    id
                })
                console.log(price)
            }
        },
        destroy(id) {
            this.$store.dispatch('deleteCart', id)
        }
    },
    computed: {
        fetchTotal() {
            return new Intl.NumberFormat().format(this.data.Product.price * this.quantity)
        }
    },
    created() {
        this.$store.dispatch('setShowCart', true)
    }
}
</script>
