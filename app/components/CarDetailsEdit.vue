<template>
    <Page class="page">
        <GridLayout class="page-content">
            <ScrollView>
                <StackLayout class="car-list">
                    <Label text="CAR MAKE" class="car-list-odd" />
                    <TextField :text="car.name" hint="Car make field is required"
                        :class="{ [car.name]: true, [car.name ? 'car-list-even' : 'car-list-even invalid-text']: true }" />

                    <GridLayout rows="*, 55, *" columns="*, auto" class="car-list-odd" >
                        <Label text="PRICE PER DAY" />
                        <Label col="1" horizontalAlignment="right" class="text-primary car-list-price">
                            <FormattedString>
                                <Span text="€" />
                                <Span :text="car.price" />
                            </FormattedString>
                        </Label>

                        <StackLayout row="1" colSpan="2" verticalAlignment="center">
                            <Slider v-model="car.price" />
                        </StackLayout>

                        <Label text="ADD OR REMOVE IMAGE" row="2" colSpan="2" />
                    </GridLayout>

                    <StackLayout class="car-list-even">
                        <GridLayout height="80" width="80" class="thumb" horizontalAlignment="left"
                            :backgroundImage="car.imageUrl" @tap="onImageAddRemoveTap">
                            <GridLayout class="thumb-add"
                                :visibility="car.imageUrl">
                                <Label text="&#xf030;" class="fa" horizontalAlignment="center" verticalAlignment="center" />
                            </GridLayout>
                            <GridLayout class="thumb-remove"
                                :visibility="car.imageUrl">
                                <Label text="&#xf014;" class="fa" horizontalAlignment="center" verticalAlignment="center" />
                            </GridLayout>
                        </GridLayout>
                        <Label :visibility="car.imageUrl" class="invalid-image" text="Image field is required" />
                    </StackLayout>

                    <Label text="CLASS" class="car-list-odd" />
                    <GridLayout columns="*, auto" @tap="onSelectorTap" tag="class" class="car-list-even">
                        <Label :text="car.class" />
                        <Label text="&#xf054;" class="fa text-secondary" col="1" horizontalAlignment="center" verticalAlignment="center" />
                    </GridLayout>

                    <Label text="DOORS" class="car-list-odd" />
                    <GridLayout columns="*, auto" @tap="onSelectorTap" tag="doors" class="car-list-even">
                        <Label :text="car.doors" />
                        <Label text="&#xf054;" class="fa text-secondary" col="1" horizontalAlignment="center" verticalAlignment="center" />
                    </GridLayout>

                    <Label text="SEATS" class="car-list-odd" />
                    <GridLayout columns="*, auto" @tap="onSelectorTap" tag="seats" class="car-list-even">
                        <Label :text="car.seats" />
                        <Label text="&#xf054;" class="fa text-secondary" col="1" horizontalAlignment="center" verticalAlignment="center" />
                    </GridLayout>

                    <Label text="TRANSMISSION" class="car-list-odd" />
                    <GridLayout columns="*, auto" @tap="onSelectorTap" tag="transmission" class="car-list-even">
                        <Label :text="car.transmission" />
                        <Label text="&#xf054;" class="fa text-secondary" col="1" horizontalAlignment="center" verticalAlignment="center" />
                    </GridLayout>

                    <GridLayout rows="*, 55" columns="*, auto" class="car-list-odd">
                        <Label text="LUGGAGE" />
                        <Label col="1" horizontalAlignment="right" class="text-primary">
                            <FormattedString>
                                <Span :text="car.luggage" />
                                <Span text=" Bag(s)" />
                            </FormattedString>
                        </Label>

                        <Slider row="1" colSpan="2" minValue="0" maxValue="5" v-model="car.luggage" />
                    </GridLayout>

                </StackLayout>
            </ScrollView>

            <ActivityIndicator :busy="isUpdating" />
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
            };
        },

        computed: {
            car() {
                return this.$router.app && this.$router.app.car || {};
            },

            isUpdating() {
                return false;
            }
        },

        methods: {
            onImageAddRemoveTap() {

            },

            onSelectorTap() {

            }
        },

        created() {
        },

        beforeDestroy() {
        }
    };
</script>

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';

    // Custom styles
    .car-list {

        .car-list-even,
        .car-list-odd {
            padding: 10 15;
            border-bottom-width: $border-width;
            border-color: $blue-20;
        }

        .car-list-odd {
            background-color: $blue-10;
            color: $blue-50;
        }

        .car-list-price {
            width: 35;
            text-align: right;
        }

        TextField.invalid-text {
            placeholder-color: $error;
        }

        .invalid-image {
            color: $error;
        }
    }

    .thumb {
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 25;
        font-weight: bold;

        .thumb-add {
            background-color: transparent;
            color: $blue-20;
            border-radius: $border-radius;
            border-width: $border-width;
            border-color: $blue-20;
        }

        .thumb-remove {
            color: $background-light;
            background-color: $blue-20;
        }
    }
</style>
