<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            {{ reg ? 'Sign Up' : 'Sign In'}}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="homepage">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="login" v-if="!$store.state.isLoggedIn && !reg">
                            <div class="form-group">
                                <label for="em">Email address</label>
                                <input type="email" class="form-control" id="em" aria-describedby="emailHelp" 
                                    v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="pw">Password</label>
                                <input type="password" class="form-control" id="pw" 
                                    v-model="password" required>
                            </div>
                            <div class="modal-footer">
                                <h6 class="text-secondary mr-4 ml-0">dont have an account? <a href="#" @click="reg = true" >Register</a> here</h6>
                                <button type="submit" class="btn btn-primary">Sign In</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="homepage">Close</button>
                            </div>
                        </form>
                        <form @submit.prevent="register" v-else-if="!$store.state.isLoggedIn && reg">
                            <div class="form-group" v-if="showAlert">
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    {{ err }}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"
                                        @click="showAlert = false; err = ''">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name"  
                                    v-model="name" required>
                            </div>
                            <div class="form-group">
                                <label for="em">Email address</label>
                                <input type="email" class="form-control" id="em" aria-describedby="emailHelp" 
                                    v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="pw">Password</label>
                                <input type="password" class="form-control" id="pw" 
                                    v-model="password" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="cpw">Confirm Password</label>
                                <input type="password" class="form-control" id="cpw" 
                                    v-model="cpassword" required>
                            </div>
                            <div class="modal-footer">
                                <h6 class="text-secondary mr-4 ml-0">have an account? 
                                    <a href="#" @click="reg = false; showAlert = false; err = ''" >Login</a> here</h6>
                                <button type="submit" class="btn btn-primary">Sign Up</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="homepage">Close</button>
                            </div>
                        </form>
                        <div v-else>
                            <h6 class="text-secondary">Welcome, {{ getName }}</h6>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="homepage">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalSignIn',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            reg: false,
            showAlert: false,
            err: ''
        }
    },
    methods: {
        homepage() {
            this.$store.dispatch('setShowCart', false)
            this.$router.push({ name: 'Dashboard' })
            this.$store.dispatch('setShowModal', false)
            this.name = ''
            this.email = ''
            this.password = ''
            this.cpassword = ''

        },
        login() {
            const data = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', data)
            this.$store.dispatch('setShowModal', false)
            this.name = ''
            this.email = ''
            this.password = ''
            this.cpassword = ''
        },
        register() {
            if (this.password !== this.cpassword) {
                this.showAlert = true
                this.err = `Password doesn't match`
            } else {
                const newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: 'customer'
                }
                this.$store.dispatch('register', newUser)
                this.$store.dispatch('setShowModal', false)
                this.name = ''
                this.email = ''
                this.password = ''
                this.cpassword = ''
            }
        }

    },
    computed: {
        getName() {
            return localStorage.name
        }
    }
}
</script>
