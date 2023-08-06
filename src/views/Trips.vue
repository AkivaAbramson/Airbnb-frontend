<template>
    <section class="home-layout trips-layout">
        <h1 class="trips-title">Trips</h1>
        <section class="main-content">
            <div class="next-trip">
                <div class="next-info">
                    <h1 class="info-title">You're next stay</h1>
                    <h3 class="gray subtitle">Entire amazing views hosted by Almog Agassi</h3>
                    <h1 class="stay-order">Your order is <span v-if="!isApproved" class="pending">pending...</span>
                        <span v-else class="approved">approved!</span></h1>
                    <button>Go to Stay</button>
                </div>
                <img  @click="toggleStatus" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436406/id1oo8krwgxvdf9s02qp.jpg" />
            </div>
                <div class="side-wishlist">
                    <div class="wishlist-header">
                        <h1>Wishlist</h1>
                        <h1 class="gray">8 saved stays</h1>
                    </div>
                    <ul class="wishlist-stays">
                        <li>
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436928/ouvft4oeavr7ceeha4gk.jpg" alt="">
                            <h3 class="wishlist-data">Mikonos, Greece</h3>
                        </li>
                        <li>
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437279/vgq4tkkecvdo2nzxdudx.jpg" alt="">
                            <h3 class="wishlist-data">Canazei, Italy</h3>
                        </li>
                        <li>
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg" alt="">
                            <h3 class="wishlist-data">Paris, France</h3>
                        </li>
                    </ul>

                    <button>Go to wishlist</button>
                </div>
                <!-- <div class="side-msgs">
                    <h1>messages</h1>
                    <h1 class="gray">order #o1226 has been approved</h1>
                    <button>Go to messages</button>
                </div> -->
        </section>
        <!-- <section class="prev-trips">
            <h1>Where you've been</h1>
        </section> -->
        <section class="prev-trips">
            <h2>Where you've been</h2>
            <ul class="mini-stays">
                <li class="mini-stay">
                    <div class="mini-stay-img"><img
                            src="https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg"
                            alt=""></div>
                    <div class="mini-stay-desc">
                        <h1>Barcelona</h1>
                        <h4 class="small-gray">hosted by Angel</h4>
                        <h4 class="small-gray">Feb 12-19, 2023</h4>
                    </div>
                </li>
                <li class="mini-stay">
                    <div class="mini-stay-img"><img
                            src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436255/nmccht42mpd6erdeqjhi.jpg"
                            alt=""></div>
                    <div class="mini-stay-desc">
                        <h1>Rio De Janeiro</h1>
                        <h4 class="small-gray">hosted by Luana</h4>
                        <h4 class="small-gray">June 08-13, 2022</h4>
                    </div>
                </li>
                <li class="mini-stay">
                    <div class="mini-stay-img"><img
                            src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436797/hzfu8ihyoecadrermn14.jpg"
                            alt=""></div>
                    <div class="mini-stay-desc">
                        <h1>Maui</h1>
                        <h4 class="small-gray">hosted by Francesco</h4>
                        <h4 class="small-gray">Jan 18-24, 2022</h4>
                    </div>
                </li>
                <li class="mini-stay">
                    <div class="mini-stay-img"><img
                            src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436588/cxkvvaext8m0kjuaxcrk.jpg"
                            alt=""></div>
                    <div class="mini-stay-desc">
                        <h1>Montreal</h1>
                        <h4 class="small-gray">hosted by Sonia</h4>
                        <h4 class="small-gray">May 07-10, 2021</h4>
                    </div>
                </li>
            </ul>
        </section>

    </section>

</template>
<script>
export default {
    data() {
        return {
            isApproved: false,
        }
    },

    methods:{
        toggleStatus() {
          this.isApproved = !this.isApproved
        },

    }

}
</script>
<style lang="">
    
</style>