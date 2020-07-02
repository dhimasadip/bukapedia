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
    computed: {
        fetchTotal() {
            return new Intl.NumberFormat().format(this.data.Product.price * this.quantity)
        }
    }
}
</script>
