<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">
       
        <div class="card mb-3 rounded shadow" style="max-width: 940px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img :src="product.img_url" class="card-img-top" >
                </div>
                <div class="col-md-8">
                    <div class="card-body pb-0 ">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <hr class="m-1">
                        <p class="card-text">{{ product.description }}</p>
                        
                        <div class="d-flex justify-content-around mb-0 pb-2">
                            <div class="d-flex flex-column mb-0 border rounded shadow" >
                                <div class=" bg-foster-50 pr-3 pl-3">
                                    <h6 class="text-center text-white">Price</h6>
                                </div>
                                <h6 class="text-dark text-center p-2 pb-0 mb-0">IDR {{ new Intl.NumberFormat().format(product.price) }}</h6>
                            </div>
                            <div class="d-flex flex-column mb-0 border rounded shadow">
                                <div class=" bg-foster-50 pr-3 pl-3">
                                    <h6 class="text-center text-white">Stock</h6>
                                </div>
                                <h6 class="text-dark text-center p-2 pb-0 mb-0">{{ product.stock }}</h6>
                            </div>
                        </div>
                        <hr>
                        <div class="mb-3 d-flex">
                            <div class="d-flex align-items-center justify-content-center">
                                <a type="button" @click="decrement" :class="quantity == 0 ? 'disabled' : ''">
                                    <img src="../assets/minus.png" alt="-">
                                </a>
                                <input 
                                    type="number" min="1" class="form-control" 
                                    style="width: 30%; height: 95%; font-size: 12px;"
                                    v-model="quantity">
                                <a type="button" @click="increment">
                                    <img src="../assets/plus.png" alt="+">
                                </a>
                            </div>
                            <div class="ml-2 w-50">
                                <a type="button" @click="addCart(product.id)" class="text-center bg-foster-50 w-50 p-1 rounded shadow"
                                    :data-toggle="$store.state.isLoggedIn ? '' : 'modal'" data-target="#staticBackdrop" v-if="showModal">
                                    <img src="../assets/shopping-cart.png" alt="-">
                                </a>
                                <a type="button" @click="showModalfn" class="text-center bg-foster-50 w-50 p-1 rounded shadow"
                                    :data-toggle="$store.state.isLoggedIn ? '' : 'modal'" data-target="#staticBackdrop" v-else>
                                    <img src="../assets/shopping-cart.png" alt="-">
                                </a>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <ModalSignIn v-if="showModal"></ModalSignIn>
           
    </div>
</template>

<script>
import ModalSignIn from '../components/ModalSignIn.vue'

export default {
    name: 'DetailProduct',
    components: {
        ModalSignIn,
    },
    data() {
        return {
            quantity: 0,
            showModal: false,
        };
    },
    methods: {
        showModalfn() {
            // if (!this.$store.state.isLoggedIn) this.$router.push({ path: '/signin'})
            this.showModal = true
        },
        increment() {
            if (Number(this.product.stock) > this.quantity) {
                this.quantity++
            }
        },
        decrement(id) {
            if (Number(this.quantity) > 0) {
                this.quantity--
            }
        },
        addCart(id) {
            const data = {
                id,
                quantity: this.quantity
            }
            this.$store.dispatch('addToCart', data)
            console.log(data)
        }
    },
    computed: {
        product() {
            return this.$store.state.details
        }
    },
    created() {
        const id = this.$route.params.id
        this.$store.dispatch('getDetail', id)
        if (this.$store.state.isLoggedIn) {
            this.showModal = true
        }
    }
}
</script>
