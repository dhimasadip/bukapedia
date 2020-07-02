<template>
    <div class="">
        <nav class="bg-foster d-flex justify-content-between align-items-center pl-3 pr-3">
            <div class="d-flex align-items-center">
                <a class="navbar-brand" type="button" @click="homepage">
                    <img src="../assets/market.png" alt="logo">
                </a>
                <h3 class="text-foster-50">Bukapedia</h3>
            </div>
         
            <div class="w-75 ml-5">
                <form class="form-inline my-2 my-lg-0" >
                    <input class="form-control w-75" type="search" placeholder="Search product" aria-label="Search">
                    <button class="btn btn-outline-light my-2 my-sm-0 rounded-right" type="submit">Search</button>
                </form>
            </div>
            <div class="text-decoration-none">
                <a class="dropdown-toggle text-light" type="button" id="navbarDropdown" role="button" 
                    :data-toggle="$store.state.isLoggedIn ? 'dropdown' : 'modal'" 
                    :data-target="$store.state.isLoggedIn ? '' : '#staticBackdrop'" 
                    aria-haspopup="true" aria-expanded="false" @click="showModalfn">
                    {{ getName }}  <img src="../assets/user.png" alt="logo">
                </a>
                <div class="dropdown-menu text-right bg-foster-50" aria-labelledby="navbarDropdown" v-if="getName !== 'Sign In'">
                    <a class="dropdown-item" type="button" @click="signOut">Sign Out</a>
                    <a class="dropdown-item" type="button" @click="myCart">My Cart</a>
                    <a class="dropdown-item" type="button" @click="transactions">Transactions</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" type="button">{{ getEmail }}</a>
                </div>
            </div>
              
        </nav>
        
        <ModalSignIn v-if="showModal"></ModalSignIn>
    </div>
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-foster">
        <div class="d-flex align-items-center">
            <a class="navbar-brand" type="button" @click="homepage">
                <img src="../assets/market.png" alt="logo">
            </a>
            <h3 class="text-foster-50">Bukapedia</h3>
        </div>
        <div class="w-75">
            <form class="form-inline my-2 my-lg-0 justify-content-center">
                <input class="form-control w-75" type="text" placeholder="Search..." aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
         
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" type="button" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="setDropdown">  
                    {{ getName }}  <img src="../assets/user.png" alt="logo">
                    </a>
                    
                    <div class="dropdown-menu dropdown-menu-right text-right bg-foster-50" aria-labelledby="navbarDropdown" v-if="getName !== 'Sign In'">
                        <a class="dropdown-item" type="button" @click="signOut">Sign Out</a>
                        <a class="dropdown-item" type="button" @click="myCart">My Cart</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item disabled" type="button">{{ getEmail }}</a>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right p-3" :class="showDropdown ? 'show' : ''"
                        style="width: 250px !important;" v-else>
                        <form class="form-horizontal" >
                            <div class="form-group">
                                <input class="form-control login" type="email" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input class="form-control login" type="password" placeholder="Password">
                            </div>
                            <button class="btn btn-primary" type="submit">Sign In</button>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
    </nav> -->
</template>

<script>
import ModalSignIn from '../components/ModalSignIn.vue'

export default {
    name: 'Navbar',
    data() {
        return {
            showModal: false,
            showDropdown: true,
        };
    },
    components: {
        ModalSignIn
    },
    methods: {
        homepage() {
            this.$store.dispatch('setShowCart', false)
            this.$router.push({ name: 'Dashboard' })
        },
        showModalfn() {
            // if (!this.$store.state.isLoggedIn) this.$router.push({ path: '/signin'})
            this.$store.dispatch('setShowModal', true)
            this.showModal = true
        },
        signOut() {
            this.$store.dispatch('setLogOut')
            this.$store.dispatch('setShowCart', false)
            localStorage.clear()
            this.$router.push({ name: 'Dashboard'}).catch(()=>{});
        },
        myCart() {
            this.$store.dispatch('getCarts')
            this.$store.dispatch('setShowCart', true)
            this.$router.push({ name: 'Cart' })

        },
        setDropdown() {
            if (this.showDropdown) {
                this.showDropdown = false
            } else {
                this.showDropdown = true
            }
        },
        transactions() {
            this.$router.push({ name: 'Transactions'})
        }
    },
    computed: {
        getName() {
            if (this.$store.state.user.name) {
                return this.$store.state.user.name
            } else {
                return 'Sign In'
            }
        },
        getEmail() {
            return this.$store.state.user.email
        },
    }
};
</script>
