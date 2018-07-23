<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'Edit ' + car.name" horizontalAlignment="center" />
           <ActionItem @tap="onCancelButtonTap" ios:position="left" android:position="left">
               <Label text="Cancel" verticalAlignment="center" class="action-item" />
           </ActionItem>
           <ActionItem ios:position="right" android:position="right">
               <Label text="Done" class="action-item" verticalAlignment="center" @tap="onDoneButtonTap"
                   :isEnabled="car.isModelValid"
                   :isUserInteractionEnabled="car.isModelValid" />
           </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout class="car-list">
                <Label text="CAR MAKE" class="car-list-odd" />
                <TextField :text="car.name" hint="Car make field is required"
                    :class="{ [car.name]: true, [car.name ? 'car-list-even' : 'car-list-even invalid-text']: true }" />

                <StackLayout class="car-list-odd" orientation="horizontal">
                    <Label text="PRICE PER DAY" />
                    <Label col="1" horizontalAlignment="right" class="text-primary car-list-price">
                        <FormattedString>
                            <Span text.decode="&euro;" />
                            <Span :text="car.price" />
                        </FormattedString>
                    </Label>
                </StackLayout>

                <Slider v-model="car.price" height="70" verticalAlignment="center" class="car-list-even" />
                <Label text="ADD OR REMOVE IMAGE" row="2" colSpan="2" class="car-list-odd" />

                <StackLayout height="80" width="80" class="thumb car-list-even" horizontalAlignment="left"
                    :backgroundImage="car.imageUrl" @tap="onImageAddRemoveTap">
                    <Label text.decode="&#xf030;" class="fa thumb-add" horizontalAlignment="center" verticalAlignment="center" v-show="!car.imageUrl"/>
                    <Label text.decode="&#xf014;" class="fa thumb-remove" horizontalAlignment="center" verticalAlignment="center" v-show="car.imageUrl" />
                </StackLayout>
                <Label v-show="!car.imageUrl" class="invalid-image car-list-even" text="Image field is required" />

                <Selector label="CLASS" v-model="car.class"></Selector>

                <Selector label="DOORS" v-model="car.doors"></Selector>

                <Selector label="SEATS" v-model="car.seats"></Selector>

                <Selector label="TRANSMISSION" v-model="car.transmission"></Selector>

                <StackLayout orientation="horizontal" class="car-list-odd">
                    <Label text="LUGGAGE" />
                    <Label col="1" horizontalAlignment="right" class="text-primary">
                        <FormattedString>
                            <Span :text="car.luggage" />
                            <Span text=" Bag(s)" />
                        </FormattedString>
                    </Label>
                </StackLayout>

                <Slider minValue="0" maxValue="5" height="70" v-model="car.luggage" class="car-list-even" verticalAlignment="center" />

                <ActivityIndicator :busy="isUpdating" />
            </StackLayout>
        </ScrollView>
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

            },

            onCancelButtonTap() {
                this.$router.back();
            },

            onDoneButtonTap() {

            }
        },

        created() {
        },

        beforeDestroy() {
            console.log("before-destroy edit")
        },

        destroyed() {
            console.log("destroyed edit")
        }
    };
</script>

<style lang="scss">
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

        .text-secondary {
            horizontal-alignment: right;
            vertical-alignment: center;
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

    .page .thumb {
        background-size: cover;
        background-repeat: no-repeat;
        padding: 0;
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

    .list-modal-view {
        color: $blue-dark;
        background-color: $blue-10;

        .list-modal-item {
            vertical-align: center;
            margin-bottom: 10;
        }
    }
</style>
