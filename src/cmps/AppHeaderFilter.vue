<template>
    <section class="header-filter">
        <ul class="main-labels clean-list">
            <li class="label" v-for="label in labels" :key="labels">
                <button class="label-button">
                    <img :src="label.imgUrl">
                    <p>{{ label.name }}</p>
                </button>
            </li>
        </ul>
        <div class="main-filters">
            <button class="filter-button">
                <div>p</div>
                <p>Filters</p>
            </button>
        </div>
    </section>

</template>

<script>
export default {
    data() {
        return {
            labels: [
                {
                    name: "Beachfront",
                    imgUrl: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"
                },
                {
                    name: "Amazing pools",
                    imgUrl: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
                },
                {
                    name: "OMG!",
                    imgUrl: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"
                },
                {
                    name: "Islands",
                    imgUrl: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
                },
                {
                    name: "Farms",
                    imgUrl: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
                },
                {
                    name: "Amazing views",
                    imgUrl: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
                },
                {
                    name: "Lakefront",
                    imgUrl: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
                },
                {
                    name: "Countryside",
                    imgUrl: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
                },
                {
                    name: "Trending",
                    imgUrl: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg"
                },
                {
                    name: "Cabins",
                    imgUrl: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
                },
                {
                    name: "Castles",
                    imgUrl: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
                },
                {
                    name: "Tiny homes",
                    imgUrl: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg"
                },
                {
                    name: "Farms",
                    imgUrl: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
                },
                {
                    name: "Play",
                    imgUrl: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg"
                },
                {
                    name: "Luxe",
                    imgUrl: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
                },
                {
                    name: "Vineyards",
                    imgUrl: "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg"
                },
                {
                    name: "National parks",
                    imgUrl: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
                },
                {
                    name: "Rooms",
                    imgUrl: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
                },
                {
                    name: "Design",
                    imgUrl: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
                },
                {
                    name: "Boats",
                    imgUrl: "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg"
                },
                {
                    name: "Iconic cities",
                    imgUrl: "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg"
                },
                {
                    name: "Camping",
                    imgUrl: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg"
                },
                {
                    name: "Tropical",
                    imgUrl: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg"
                },
                {
                    name: "Off-the-grid",
                    imgUrl: "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg"
                },
                // {
                //     name: "",
                //     imgUrl: ""
                // }
            ]
        }
    }
}
</script>